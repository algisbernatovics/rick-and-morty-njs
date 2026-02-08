import { rickAndMortyApi } from "@/lib/api";
import { getEpisodeIdFromUrl, cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, Tv } from "lucide-react";
import { EpisodeRow } from "@/components/EpisodeRow";

interface CharacterPageProps {
    params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
    const { id } = await params;
    const characterId = parseInt(id);

    try {
        const character = await rickAndMortyApi.getSingleCharacter(characterId);

        const episodeIds = character.episode.map(url => getEpisodeIdFromUrl(url));
        const episodes = await rickAndMortyApi.getMultipleEpisodes(episodeIds);

        return (
            <div className="max-w-5xl mx-auto px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                    BACK TO ALL CHARACTERS
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-1">
                        <div className="sticky top-32">
                            <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-primary/20 shadow-[0_0_30px_rgba(151,206,76,0.15)]">
                                <Image
                                    src={character.image}
                                    alt={character.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <div className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-xl font-black uppercase tracking-tighter text-sm",
                                    character.status === 'Alive' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                        character.status === 'Dead' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                            'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                                )}>
                                    <div className={cn(
                                        "h-2.5 w-2.5 rounded-full shadow-sm",
                                        character.status === 'Alive' ? 'bg-green-500' :
                                            character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                                    )} />
                                    {character.status}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white leading-none">
                                {character.name.toUpperCase()}
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 rounded-full glass text-secondary font-bold text-sm uppercase">
                                    {character.species}
                                </span>
                                {character.type && (
                                    <span className="px-4 py-2 rounded-full glass text-accent font-bold text-sm uppercase">
                                        {character.type}
                                    </span>
                                )}
                                <span className="px-4 py-2 rounded-full glass text-muted-foreground font-bold text-sm uppercase">
                                    {character.gender}
                                </span>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="glass p-6 rounded-2xl flex items-start gap-4 border-l-4 border-primary">
                                <MapPin className="text-primary shrink-0" size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Origin</p>
                                    <p className="text-lg font-bold text-white leading-tight">{character.origin.name}</p>
                                </div>
                            </div>

                            <div className="glass p-6 rounded-2xl flex items-start gap-4 border-l-4 border-secondary">
                                <MapPin className="text-secondary shrink-0" size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Last Known Location</p>
                                    <p className="text-lg font-bold text-white leading-tight">{character.location.name}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Tv className="text-primary" size={28} />
                                <h2 className="text-2xl font-black tracking-tight text-white uppercase">Featured Episodes</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {episodes.map((episode) => (
                                    <EpisodeRow key={episode.id} episode={episode} />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-4xl font-black mb-4 text-red-500">GLITCH IN THE MULTIVERSE!</h2>
                <p className="text-xl text-muted-foreground mb-8">This character seems to have been erased from existence.</p>
                <Link href="/" className="px-8 py-4 rounded-xl bg-primary text-black font-black hover:scale-105 transition-transform">
                    RETURN TO SAFETY
                </Link>
            </div>
        );
    }
}
