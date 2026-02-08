import { rickAndMortyApi } from "@/lib/api";
import { getEpisodeIdFromUrl } from "@/lib/utils";
import { CharacterCard } from "@/components/CharacterCard";
import { ChevronLeft, Calendar, Tv, Users } from "lucide-react";
import Link from "next/link";

interface EpisodePageProps {
    params: Promise<{ id: string }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
    const { id } = await params;
    const episodeId = parseInt(id);

    try {
        const episode = await rickAndMortyApi.getSingleEpisode(episodeId);

        const characterIds = episode.characters.map(url => getEpisodeIdFromUrl(url));
        const characters = await rickAndMortyApi.getMultipleCharacters(characterIds);

        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link
                    href="/episodes"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                    BACK TO ALL EPISODES
                </Link>

                <header className="mb-16 text-center">
                    <p className="text-primary font-black tracking-[0.3em] uppercase mb-4 animate-fade-in group">
                        Season {episode.episode.substring(1, 3)} • Episode {episode.episode.substring(4, 6)}
                    </p>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none">
                        {episode.name}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                            <Calendar className="text-secondary" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Original Air Date</p>
                                <p className="font-bold text-white">{episode.air_date}</p>
                            </div>
                        </div>
                        <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                            <Users className="text-accent" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Characters Featured</p>
                                <p className="font-bold text-white">{characters.length} dimensional beings</p>
                            </div>
                        </div>
                    </div>
                </header>

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <Tv className="text-primary" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">
                            Characters Featured in Episode &apos;{episode.name}&apos;
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {characters.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-4xl font-black mb-4 text-red-500">EPISODE NOT FOUND!</h2>
                <p className="text-xl text-muted-foreground mb-8">This episode seems to have been censored by the Galactic Federation.</p>
                <Link href="/episodes" className="px-8 py-4 rounded-xl bg-primary text-black font-black hover:scale-105 transition-transform">
                    RETURN TO SAFETY
                </Link>
            </div>
        );
    }
}
