import type { MetadataRoute } from "next";
import { rickAndMortyApi } from "@/lib/api";
import { getAbsoluteUrl } from "@/lib/seo";

async function getAllIds(
  fetchPage: (params: URLSearchParams) => Promise<{ info: { pages: number }; results: Array<{ id: number }> }>
) {
  const firstPageParams = new URLSearchParams({ page: "1" });
  const firstPage = await fetchPage(firstPageParams);
  const pages = firstPage.info.pages;
  const ids = firstPage.results.map((item) => item.id);

  if (pages <= 1) {
    return ids;
  }

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, index) => {
      const params = new URLSearchParams({ page: String(index + 2) });
      return fetchPage(params);
    })
  );

  for (const page of rest) {
    ids.push(...page.results.map((item) => item.id));
  }

  return ids;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [characterIds, episodeIds, locationIds] = await Promise.all([
    getAllIds(rickAndMortyApi.getCharacters),
    getAllIds(rickAndMortyApi.getEpisodes),
    getAllIds(rickAndMortyApi.getLocations),
  ]);

  const routes: MetadataRoute.Sitemap = [
    { url: getAbsoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: getAbsoluteUrl("/episodes"), changeFrequency: "weekly", priority: 0.9 },
    { url: getAbsoluteUrl("/locations"), changeFrequency: "weekly", priority: 0.9 },
    { url: getAbsoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
  ];

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

  return routes;
}
