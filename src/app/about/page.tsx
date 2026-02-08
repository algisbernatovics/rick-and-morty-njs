import { Github, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <header className="mb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
                    About the <span className="text-primary">App</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                    This project is a high-performance, visually stunning explorer for the Rick and Morty universe, built with modern web technologies.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-8">
                <section className="glass p-8 md:p-12 rounded-3xl border-l-4 border-primary">
                    <div className="flex items-center gap-4 mb-6">
                        <Heart className="text-primary" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Special Thanks</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        A huge thanks to the <span className="text-white font-bold">Axel Fuhrmann</span> and the team behind the <Link href="https://rickandmortyapi.com/" target="_blank" className="text-primary hover:underline font-bold">Rick and Morty API</Link>.
                        Your amazing work makes this kind of exploration possible across all dimensions.
                    </p>
                </section>

                <section className="glass p-8 md:p-12 rounded-3xl border-l-4 border-secondary">
                    <div className="flex items-center gap-4 mb-6">
                        <ExternalLink className="text-secondary" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Deployment</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        This application is deployed on <span className="text-white font-bold">Vercel</span>, ensuring high availability and lightning-fast worldwide delivery of multiversal data.
                    </p>
                </section>

                <section className="glass p-8 md:p-12 rounded-3xl border-l-4 border-accent">
                    <div className="flex items-center gap-4 mb-6">
                        <Github className="text-accent" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Source Code</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        The complete source code for this project is available on GitHub. Feel free to explore, clone, or find your own variation in another reality.
                    </p>
                    <Link
                        href="https://github.com/algisbernatovics/rick-and-morty-njs"
                        target="_blank"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent text-black font-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(240,225,74,0.3)]"
                    >
                        <Github size={24} />
                        VIEW ON GITHUB
                    </Link>
                </section>
            </div>
        </div>
    );
}
