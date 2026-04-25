import type { MetadataRoute } from "next";
import { rickAndMortyApi } from "@/lib/api";
import { getAbsoluteUrl } from "@/lib/seo";

async function getIdRange(
  fetchPage: (params: URLSearchParams) => Promise<{ info: { count: number } }>
) {
  const firstPageParams = new URLSearchParams({ page: "1" });
  const firstPage = await fetchPage(firstPageParams);

  return Array.from({ length: firstPage.info.count }, (_, index) => index + 1);
}

function getStaticRoutes(): MetadataRoute.Sitemap {
  return [
    { url: getAbsoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: getAbsoluteUrl("/episodes"), changeFrequency: "weekly", priority: 0.9 },
    { url: getAbsoluteUrl("/locations"), changeFrequency: "weekly", priority: 0.9 },
    { url: getAbsoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = getStaticRoutes();

  try {
    const [characterIds, episodeIds, locationIds] = await Promise.all([
      getIdRange(rickAndMortyApi.getCharacters),
      getIdRange(rickAndMortyApi.getEpisodes),
      getIdRange(rickAndMortyApi.getLocations),
    ]);

    routes.push(
      ...characterIds.map((id) => ({
        url: getAbsoluteUrl(`/character/${id}`),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    );
    routes.push(
      ...episodeIds.map((id) => ({
        url: getAbsoluteUrl(`/episode/${id}`),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    );
    routes.push(
      ...locationIds.map((id) => ({
        url: getAbsoluteUrl(`/location/${id}`),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    );
  } catch (error) {
    console.error("Failed to build full sitemap, returning core routes only.", error);
  }

  return routes;
}
