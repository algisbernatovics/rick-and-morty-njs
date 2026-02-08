import { rickAndMortyApi } from "@/lib/api";
import { Pagination } from "@/components/Pagination";
import { Search, MapPin } from "lucide-react";
import { LocationCard } from "@/components/LocationCard";
import Link from "next/link";

interface LocationsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LocationsPage({ searchParams }: LocationsProps) {
    const params = await searchParams;
    const page = typeof params.page === "string" ? parseInt(params.page) : 1;
    const name = typeof params.name === "string" ? params.name : undefined;

    const searchUrlParams = new URLSearchParams();
    searchUrlParams.set("page", page.toString());
    if (name) searchUrlParams.set("name", name);

    try {
        const { results: locations, info } = await rickAndMortyApi.getLocations(searchUrlParams);

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <MapPin className="text-secondary shrink-0" size={56} strokeWidth={2.5} />
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-secondary">
                            LOCATIONS
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <form action="/locations" className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type="text"
                                name="name"
                                defaultValue={name}
                                placeholder="Search locations..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium"
                            />
                        </form>

                        <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
                            Total Locations: <span className="text-white">{info.count}</span>
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((location) => (
                        <LocationCard key={location.id} location={location} />
                    ))}
                </div>

                <Pagination
                    currentPage={page}
                    totalPages={info.pages}
                    baseUrl="/locations"
                />
            </div>
        );
    } catch (error: any) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-4xl font-black mb-4 text-secondary">LOST IN SPACE!</h2>
                <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
                    {error.message === "Resource not found"
                        ? "We couldn't find that location. Maybe it was destroyed by a rogue Rick?"
                        : "Something went wrong in this dimension. Please try again later."}
                </p>
                <Link href="/locations" className="px-8 py-4 rounded-xl bg-secondary text-black font-black hover:scale-105 transition-transform">
                    OPEN PORTAL BACK
                </Link>
            </div>
        );
    }
}
