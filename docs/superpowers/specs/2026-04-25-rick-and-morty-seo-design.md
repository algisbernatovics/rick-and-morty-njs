# Rick and Morty SEO Design

Date: 2026-04-25
Project: `rickmorty-njs`
Scope: Technical SEO plus search-intent copy improvements for the existing Next.js app

## Goal

Improve organic visibility for English long-tail searches around Rick and Morty characters, episodes, and locations. The target is not to outrank official or high-authority domains for the head term `rick morty`, but to compete more effectively for searches such as:

- `rick and morty characters`
- `rick and morty episode guide`
- `rick and morty locations`
- character-name, episode-name, and location-name queries

## Non-Goals

- Building a CMS or editorial publishing workflow
- Adding heavy blog content or listicles
- Changing the primary visual identity of the site
- Adding non-English localization in this phase

## Current State Summary

The app already has a useful structure for SEO:

- App Router layout in `src/app/layout.tsx`
- List pages for characters, episodes, and locations
- Dynamic detail pages for each entity type
- Stable internal linking between listings and entities
- Cached API reads via the Rick and Morty API

The SEO gaps are:

- generic site metadata
- no route-specific metadata strategy
- no sitemap or robots output
- thin page copy on list and detail pages
- headings and section labels that favor style over search intent
- no structured data layer

## Recommended Approach

Use a combined `1 + 2` strategy:

1. Technical SEO foundation
2. Stronger on-page search intent framing

This keeps the app in its current architecture while making each page easier for search engines to understand and index.

## Information Architecture

The main search surfaces remain the same:

- `/` for the character index
- `/episodes` for the episode index
- `/locations` for the location index
- `/character/[id]` for character entities
- `/episode/[id]` for episode entities
- `/location/[id]` for location entities

The homepage acts as the main hub for `Rick and Morty characters`. Episodes and locations get their own focused landing pages, and detail pages become richer entity targets for long-tail queries.

## Metadata Strategy

### Global Metadata

Update `src/app/layout.tsx` to provide:

- a stronger default title template
- a site description aligned with long-tail search use cases
- `metadataBase` using the production site URL
- default Open Graph metadata
- default Twitter metadata
- canonical defaults where appropriate

The site title should position the app as an explorer or guide rather than only the franchise name.

### Listing Page Metadata

Add route-specific metadata for:

- `/`
- `/episodes`
- `/locations`
- `/about`

Each page should have:

- distinct title
- distinct meta description
- canonical URL
- Open Graph values matching page intent

When a list page has a `name` query parameter, metadata can reflect that filtered state cautiously, but should avoid overfitting thin search-result pages.

### Detail Page Metadata

Use `generateMetadata` on:

- `src/app/character/[id]/page.tsx`
- `src/app/episode/[id]/page.tsx`
- `src/app/location/[id]/page.tsx`

Each detail page should generate:

- entity-specific title
- natural-language description derived from API fields
- canonical URL
- Open Graph title and description

Description templates should use available data only, for example:

- character name, status, species, origin, current location, episode count
- episode name, season and episode code, air date, character count
- location name, type, dimension, resident count

## Structured Data

Add a reusable SEO helper module in `src/lib` to build JSON-LD objects.

### Character Pages

Use structured data shaped as a media-related entity page. The implementation can model the page as a `WebPage` with a clear `about` object rather than claiming unsupported facts. The JSON-LD should identify the character entity, page URL, image, and descriptive summary built from API data.

### Episode Pages

Use JSON-LD that identifies the page as being about a Rick and Morty episode, including name, season and episode code, air date, and linked cast list where practical.

### Location Pages

Use JSON-LD that identifies the page as being about a Rick and Morty location, including type, dimension, and resident count.

The implementation should stay conservative and avoid unsupported schema claims when the API does not provide enough information.

## Indexing Assets

Add:

- `src/app/sitemap.ts`
- `src/app/robots.ts`

### Sitemap

The sitemap should include:

- homepage
- episodes listing page
- locations listing page
- about page
- all character detail pages
- all episode detail pages
- all location detail pages

Sitemap generation should fetch enough index information from the Rick and Morty API to enumerate all entity IDs. It should use the same production site URL as metadata generation.

### Robots

The robots output should:

- allow normal crawling of public routes
- point to the generated sitemap
- avoid unnecessary restrictions

## On-Page SEO Copy Strategy

Keep the Rick and Morty API as the source of truth, but add short editorial framing copy to help search engines understand page purpose.

### Homepage

Reframe the hero copy to explicitly target `Rick and Morty characters`.

Add:

- a short intro paragraph explaining that the page is a searchable character index
- copy that references names, status, species, origin, and episode appearances

Keep the grid and search UI intact.

### Episodes Listing

Add a short intro that describes the page as a Rick and Morty episode guide with searchable episode names, codes, and air dates.

### Locations Listing

Add a short intro that describes the page as a guide to Rick and Morty locations, dimensions, and known residents.

### Character Detail Pages

Under the character name, add a short natural-language summary built from:

- status
- species
- gender
- origin
- current location
- episode count

This should read like an entity summary, not promotional copy.

### Episode Detail Pages

Add a short episode summary that includes:

- episode name
- season and episode code
- original air date
- number of featured characters

Rename visible section headings to better match search language.

### Location Detail Pages

Add a short location summary that includes:

- location name
- type
- dimension
- resident count

Rename visible section headings to better match search language.

## Heading and Internal Link Strategy

Improve semantic clarity without changing route structure.

- Keep a single clear `h1` per page
- Use descriptive `h2` labels that include search-relevant phrasing
- Avoid overusing stylized all-caps labels when they reduce clarity
- Preserve and strengthen internal linking between list and detail pages

Section titles such as `Featured Episodes` or `Characters Featured in Location` should be rewritten toward direct, query-aligned wording where useful.

## Error Handling and Indexing Rules

Invalid entity IDs should produce proper not-found behavior where feasible instead of only rendering custom soft-error content. This reduces the chance of weak invalid pages being indexed.

Filtered list pages with no results should still render a useful empty state for users, but metadata should not present them as rich evergreen landing pages for arbitrary query strings.

Noindex is not required for the main public pages in this phase unless implementation details reveal a specific duplicate-content issue.

## Implementation Structure

Add a focused helper in `src/lib` for:

- site URL configuration
- canonical URL builders
- reusable title and description generators
- JSON-LD builders

This keeps page components from accumulating duplicated SEO string templates.

No CMS, database, or backend changes are required.

## Testing and Verification

Implementation should be verified with:

- `npm run lint`
- `npm run build`
- inspection of generated metadata on a sample character page
- inspection of generated metadata on a sample episode page
- inspection of generated metadata on a sample location page
- inspection of `robots` output
- inspection of `sitemap` output
- validation that invalid entity IDs return not-found behavior as intended

## Risks and Constraints

- The site will still face strong authority competition for the head term `rick morty`
- API-driven content limits uniqueness, so the added editorial framing copy must stay concise but meaningful
- Metadata quality can improve crawl understanding, but ranking gains depend on overall site authority as well
- If the production site URL is not configured correctly, canonical and sitemap output will be weakened

## Success Criteria

The work is successful when:

- every public route has clear, route-specific metadata
- sitemap and robots are available and valid
- character, episode, and location detail pages each include concise, query-aligned summaries
- list pages clearly describe their search intent in visible copy
- invalid entity routes are handled as proper not-found pages where feasible
- the app builds cleanly after the SEO update

## Out of Scope for This Spec

- backlink strategy
- external marketing work
- Search Console setup
- analytics dashboards
- large-scale editorial publishing
