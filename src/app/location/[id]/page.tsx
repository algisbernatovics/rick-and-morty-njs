import { rickAndMortyApi } from "@/lib/api";
import { getEpisodeIdFromUrl } from "@/lib/utils";
import { CharacterCard } from "@/components/CharacterCard";
import { ChevronLeft, Globe, MapPin, Users } from "lucide-react";
import Link from "next/link";

interface LocationPageProps {
    params: Promise<{ id: string }>;
}

export default async function LocationPage({ params }: LocationPageProps) {
    const { id } = await params;
    const locationId = parseInt(id);

    try {
        const location = await rickAndMortyApi.getSingleLocation(locationId);

        const characterIds = location.residents.map(url => getEpisodeIdFromUrl(url));
        const characters = await rickAndMortyApi.getMultipleCharacters(characterIds);

        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link
                    href="/locations"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                    BACK TO ALL LOCATIONS
                </Link>

                <header className="mb-16 text-center">
                    <p className="text-secondary font-black tracking-[0.3em] uppercase mb-4 animate-fade-in group">
                        {location.type} • {location.dimension}
                    </p>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none italic bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                        {location.name}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                            <Globe className="text-secondary" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dimension</p>
                                <p className="font-bold text-white uppercase">{location.dimension}</p>
                            </div>
                        </div>
                        <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                            <Users className="text-primary" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Known Residents</p>
                                <p className="font-bold text-white">{characters.length} beings</p>
                            </div>
                        </div>
                    </div>
                </header>

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <MapPin className="text-secondary" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">
                            Characters featured in location &apos;{location.name}&apos;
                        </h2>
                    </div>

                    {characters.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {characters.map((character) => (
                                <CharacterCard key={character.id} character={character} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass p-12 rounded-3xl text-center border-2 border-dashed border-white/10">
                            <p className="text-2xl font-black text-muted-foreground uppercase tracking-tighter">
                                No known residents in this location... yet.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        );
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-4xl font-black mb-4 text-secondary">LOCATION NOT FOUND!</h2>
                <p className="text-xl text-muted-foreground mb-8">This location seems to have been destroyed by a rogue Rick.</p>
                <Link href="/locations" className="px-8 py-4 rounded-xl bg-secondary text-black font-black hover:scale-105 transition-transform">
                    RETURN TO SAFETY
                </Link>
            </div>
        );
    }
}
