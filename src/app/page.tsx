import { rickAndMortyApi } from "@/lib/api";
import { CharacterCard } from "@/components/CharacterCard";
import { Pagination } from "@/components/Pagination";
import { Search, Users } from "lucide-react";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const name = typeof params.name === "string" ? params.name : undefined;

  const searchUrlParams = new URLSearchParams();
  searchUrlParams.set("page", page.toString());
  if (name) searchUrlParams.set("name", name);

  try {
    const { results: characters, info } = await rickAndMortyApi.getCharacters(searchUrlParams);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Users className="text-primary shrink-0" size={56} strokeWidth={2.5} />
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary">
              CHARACTERS
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <form action="/" className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                name="name"
                defaultValue={name}
                placeholder="Search characters..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              />
            </form>

            <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
              Total Characters: <span className="text-white">{info.count}</span>
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={info.pages}
          baseUrl="/"
        />
      </div>
    );
  } catch (error: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-4xl font-black mb-4 text-red-500">WUBBA LUBBA DUB DUB!</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          {error.message === "Resource not found"
            ? "We couldn't find any characters matching your search. Maybe they were erased from the timeline?"
            : "Something went wrong in this dimension. Please try again later."}
        </p>
        <a href="/" className="px-8 py-4 rounded-xl bg-primary text-black font-black hover:scale-105 transition-transform">
          BACK TO REALITY
        </a>
      </div>
    );
  }
}
