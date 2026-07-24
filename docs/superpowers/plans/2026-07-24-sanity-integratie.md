# Sanity-integratie Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** De veranderlijke content (stats, gasten, radio-tijden, links) van de Pass De Aux one-pager beheerbaar maken via Sanity, met een embedded Studio op `/studio`.

**Architecture:** Eén singleton-document `siteInstellingen` in een nieuw Sanity-project. De homepage wordt een async server component die de singleton ophaalt via `next-sanity` met 60s time-based revalidation en de data merged over hardcoded defaults (site blijft werken bij lege/onbereikbare dataset). Studio embedded via `NextStudio` op een catch-all route.

**Tech Stack:** Next.js 16.2 (App Router, géén cacheComponents), React 19, TypeScript, Tailwind 4, `sanity`, `next-sanity`, `@sanity/vision`, `vitest` (alleen voor de pure merge-logica).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-24-sanity-integratie-design.md`
- Branch: `sanity` (bestaat al, hierop committen)
- Veldnamen exact als in de spec: `stats.playlistVolgers`, `stats.instagramVolgers`, `stats.aantalAfleveringen`, `stats.afleveringMoment`, `gasten`, `radio.dag`, `radio.tijd`, `links.{instagram,tiktok,youtube,podcast,playlist,glxy,ambassade}`
- Nederlandse titels/labels in de Studio (klant is Nederlandstalig)
- Vaste copy (hero, sectieteksten, footer) blijft hardcoded in `app/page.tsx`
- Geen Cache Components, geen Sanity Live, geen webhooks — alleen `next: { revalidate: 60 }`
- `AGENTS.md` waarschuwt dat deze Next-versie kan afwijken: raadpleeg bij twijfel `node_modules/next/dist/docs/`
- Commit-voettekst: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: Sanity-project, dependencies en env

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.env.local` (niet committen — staat al in `.gitignore` via `.env*`)
- Create: `.env.example`
- Create: `sanity/env.ts`

**Interfaces:**
- Produces: `sanity/env.ts` exporteert `projectId: string`, `dataset: string`, `apiVersion: string`. Latere tasks importeren deze via relatieve paden (bv. `../env` vanuit `sanity/lib/`, `./sanity/env` vanuit de root).

- [ ] **Step 1: Installeer dependencies**

```bash
cd /Users/kaiser/WebstormProjects/Pass-De-Aux
npm install sanity@latest next-sanity@latest @sanity/vision@latest
npm install -D vitest@latest
```

Expected: exit 0, `package.json` bevat de vier nieuwe packages.

- [ ] **Step 2: Controleer Sanity-login**

```bash
npx sanity@latest projects list 2>&1 | head -5
```

Expected: een tabel met projecten (mag leeg zijn). Als de output een login-fout bevat ("not authenticated" / "You must login"): vraag de gebruiker om `! npx sanity@latest login` te draaien in de sessie (browser-login) en wacht daarop. **Ga niet verder zonder werkende login.**

- [ ] **Step 3: Maak het Sanity-project + production-dataset**

```bash
npx sanity@latest init --bare --create-project "Pass De Aux" --dataset production
```

Expected: output bevat `Project ID: <id>` en `Dataset: production`. Noteer het project-ID exact.

- [ ] **Step 4: Schrijf `.env.local` en `.env.example`**

`.env.local` (vervang `<projectId>` door het ID uit stap 3):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<projectId>
NEXT_PUBLIC_SANITY_DATASET=production
```

`.env.example` (letterlijk, met placeholder):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=vul-project-id-in
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 5: Schrijf `sanity/env.ts`**

```typescript
function assertValue(v: string | undefined, errorMessage: string): string {
  if (v === undefined || v === "") {
    throw new Error(errorMessage);
  }
  return v;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Ontbrekende env-var: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Ontbrekende env-var: NEXT_PUBLIC_SANITY_DATASET"
);

export const apiVersion = "2026-07-01";
```

- [ ] **Step 6: Verifieer dat de build nog slaagt**

```bash
npm run build
```

Expected: build slaagt (er is nog niets gewijzigd aan de app zelf).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json .env.example sanity/env.ts
git commit -m "Sanity: dependencies, project-env en env-module

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

Let op: `.env.local` mag NIET in de commit zitten (check `git status` — hoort op ignored te staan).

---

### Task 2: Schema, studio-config en embedded Studio op /studio

**Files:**
- Create: `sanity/schemaTypes/siteInstellingen.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity.config.ts`
- Create: `sanity.cli.ts`
- Create: `app/studio/[[...tool]]/page.tsx`

**Interfaces:**
- Consumes: `projectId`, `dataset`, `apiVersion` uit `sanity/env.ts` (Task 1)
- Produces: documenttype `siteInstellingen` met exact de veldnamen uit Global Constraints; `sanity.config.ts` default export voor de Studio; `sanity.cli.ts` zodat CLI-commando's (import, cors) zonder flags werken.

- [ ] **Step 1: Schrijf het schema `sanity/schemaTypes/siteInstellingen.ts`**

```typescript
import { defineField, defineType } from "sanity";

export const siteInstellingen = defineType({
  name: "siteInstellingen",
  title: "Site-instellingen",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "Statistieken",
      type: "object",
      fields: [
        defineField({ name: "playlistVolgers", title: "Playlist-volgers", type: "string", description: "Bijv. 110K+" }),
        defineField({ name: "instagramVolgers", title: "Instagram-volgers", type: "string", description: "Bijv. 46K" }),
        defineField({ name: "aantalAfleveringen", title: "Aantal afleveringen", type: "string", description: "Bijv. 142+" }),
        defineField({ name: "afleveringMoment", title: "Moment nieuwe aflevering", type: "string", description: "Bijv. Zondag 15:00" }),
      ],
    }),
    defineField({
      name: "gasten",
      title: "Gasten (aan de aux geweest)",
      type: "array",
      of: [{ type: "string" }],
      description: "Sleep om de volgorde te wijzigen; deze lijst voedt de ticker én de gastenlijst.",
    }),
    defineField({
      name: "radio",
      title: "Radio-uitzending",
      type: "object",
      fields: [
        defineField({ name: "dag", title: "Dag", type: "string", description: "Bijv. Maandag" }),
        defineField({ name: "tijd", title: "Tijdvak", type: "string", description: "Bijv. 19:00 – 21:00" }),
      ],
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "podcast", title: "Spotify-podcast", type: "url" }),
        defineField({ name: "playlist", title: "Spotify-playlist", type: "url" }),
        defineField({ name: "glxy", title: "GLXY Radio", type: "url" }),
        defineField({ name: "ambassade", title: "Ambassade", type: "url" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site-instellingen" }),
  },
});
```

- [ ] **Step 2: Schrijf `sanity/schemaTypes/index.ts`**

```typescript
import { siteInstellingen } from "./siteInstellingen";

export const schemaTypes = [siteInstellingen];
```

- [ ] **Step 3: Schrijf `sanity.config.ts` (root)**

Singleton-opzet: het document verschijnt als één vast item in de structuur, is niet aan te maken via "New document" en heeft een vast document-ID `siteInstellingen`.

```typescript
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "pass-de-aux",
  title: "Pass De Aux",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site-instellingen")
              .id("siteInstellingen")
              .child(
                S.document()
                  .schemaType("siteInstellingen")
                  .documentId("siteInstellingen")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) => item.templateId !== "siteInstellingen"
      ),
  },
});
```

- [ ] **Step 4: Schrijf `sanity.cli.ts` (root)**

```typescript
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
```

Let op: de Sanity CLI leest `.env.local` niet automatisch in elke versie. Als een CLI-commando klaagt over een ontbrekend project-ID, prefix het commando dan met de vars, bv. `NEXT_PUBLIC_SANITY_PROJECT_ID=<id> NEXT_PUBLIC_SANITY_DATASET=production npx sanity ...`.

- [ ] **Step 5: Schrijf `app/studio/[[...tool]]/page.tsx`**

```tsx
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 6: Voeg de CORS-origin toe voor lokale ontwikkeling**

```bash
npx sanity@latest cors add http://localhost:3000 --credentials
```

Expected: bevestiging dat de origin is toegevoegd. (Productie-domein volgt bij deploy — buiten scope.)

- [ ] **Step 7: Verifieer dat de Studio laadt**

```bash
npm run build
```

Expected: build slaagt, route `/studio/[[...tool]]` verschijnt in de build-output.

Start daarna de dev-server en controleer:

```bash
npm run dev &
sleep 8
curl -s http://localhost:3000/studio | grep -io "sanity" | head -1
```

Expected: `sanity` (de studio-shell rendert). Stop de dev-server daarna weer. Volledige login-check in de browser gebeurt in Task 5.

- [ ] **Step 8: Commit**

```bash
git add sanity/schemaTypes sanity.config.ts sanity.cli.ts "app/studio/[[...tool]]/page.tsx"
git commit -m "Sanity: siteInstellingen-schema en embedded Studio op /studio

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Contentlaag — types, defaults en merge-logica (TDD)

**Files:**
- Create: `sanity/lib/content.ts`
- Test: `sanity/lib/content.test.ts`

**Interfaces:**
- Produces:
  - `type SiteContent = { stats: { playlistVolgers: string; instagramVolgers: string; aantalAfleveringen: string; afleveringMoment: string }; gasten: string[]; radio: { dag: string; tijd: string }; links: { instagram: string; tiktok: string; youtube: string; podcast: string; playlist: string; glxy: string; ambassade: string } }`
  - `const DEFAULT_CONTENT: SiteContent` — de huidige hardcoded waarden uit `app/page.tsx`
  - `function mergeSiteContent(data: unknown): SiteContent` — merged Sanity-data per veld over de defaults; lege strings, lege arrays, `null` en `undefined` vallen terug op de default
  - `function spotifyEmbedUrl(link: string): string` — `https://open.spotify.com/show/X` → `https://open.spotify.com/embed/show/X?theme=0`

- [ ] **Step 1: Schrijf de falende tests `sanity/lib/content.test.ts`**

```typescript
import { describe, expect, it } from "vitest";
import {
  DEFAULT_CONTENT,
  mergeSiteContent,
  spotifyEmbedUrl,
} from "./content";

describe("mergeSiteContent", () => {
  it("geeft defaults terug bij null", () => {
    expect(mergeSiteContent(null)).toEqual(DEFAULT_CONTENT);
  });

  it("geeft defaults terug bij leeg object", () => {
    expect(mergeSiteContent({})).toEqual(DEFAULT_CONTENT);
  });

  it("neemt gevulde velden uit Sanity over", () => {
    const result = mergeSiteContent({
      stats: { playlistVolgers: "120K+" },
      gasten: ["Nieuwe Gast"],
    });
    expect(result.stats.playlistVolgers).toBe("120K+");
    expect(result.gasten).toEqual(["Nieuwe Gast"]);
    // niet-gezette velden vallen terug op default
    expect(result.stats.instagramVolgers).toBe(
      DEFAULT_CONTENT.stats.instagramVolgers
    );
    expect(result.links).toEqual(DEFAULT_CONTENT.links);
  });

  it("valt terug op default bij lege string en lege array", () => {
    const result = mergeSiteContent({
      stats: { playlistVolgers: "" },
      gasten: [],
    });
    expect(result.stats.playlistVolgers).toBe(
      DEFAULT_CONTENT.stats.playlistVolgers
    );
    expect(result.gasten).toEqual(DEFAULT_CONTENT.gasten);
  });
});

describe("spotifyEmbedUrl", () => {
  it("zet een show-link om naar een embed-URL met theme", () => {
    expect(
      spotifyEmbedUrl("https://open.spotify.com/show/0oX4c3DeilewS7spH9Fyfl")
    ).toBe(
      "https://open.spotify.com/embed/show/0oX4c3DeilewS7spH9Fyfl?theme=0"
    );
  });

  it("zet een playlist-link om", () => {
    expect(
      spotifyEmbedUrl(
        "https://open.spotify.com/playlist/4QZ4F2Yxc6RLx7ybP0Ozn4"
      )
    ).toBe(
      "https://open.spotify.com/embed/playlist/4QZ4F2Yxc6RLx7ybP0Ozn4?theme=0"
    );
  });
});
```

- [ ] **Step 2: Draai de tests — ze moeten falen**

```bash
npx vitest run sanity/lib/content.test.ts
```

Expected: FAIL — `content.ts` bestaat nog niet ("Failed to resolve import").

- [ ] **Step 3: Schrijf `sanity/lib/content.ts`**

```typescript
export type SiteContent = {
  stats: {
    playlistVolgers: string;
    instagramVolgers: string;
    aantalAfleveringen: string;
    afleveringMoment: string;
  };
  gasten: string[];
  radio: { dag: string; tijd: string };
  links: {
    instagram: string;
    tiktok: string;
    youtube: string;
    podcast: string;
    playlist: string;
    glxy: string;
    ambassade: string;
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  stats: {
    playlistVolgers: "110K+",
    instagramVolgers: "46K",
    aantalAfleveringen: "142+",
    afleveringMoment: "Zondag 15:00",
  },
  gasten: [
    "Boef",
    "Ronnie Flex",
    "Typhoon",
    "Diggy Dex",
    "Adje",
    "Jack $hirak",
    "Kevin",
    "Willem",
    "Jordymone9",
    "Eljero Elia",
    "Rotjoch",
    "FRNKIE",
    "p.APE",
    "Jordan Wayne",
    "Rosales",
    "Sor",
  ],
  radio: { dag: "Maandag", tijd: "19:00 – 21:00" },
  links: {
    instagram: "https://www.instagram.com/pass.de.aux/",
    tiktok: "https://www.tiktok.com/@pass.de.aux",
    youtube: "https://www.youtube.com/@PASSDEAUX",
    podcast: "https://open.spotify.com/show/0oX4c3DeilewS7spH9Fyfl",
    playlist: "https://open.spotify.com/playlist/4QZ4F2Yxc6RLx7ybP0Ozn4",
    glxy: "https://glxy.radio/shows/pass-de-aux/",
    ambassade: "https://ambassade.nl",
  },
};

function veld(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

function veldenVan<T extends Record<string, string>>(
  data: unknown,
  defaults: T
): T {
  const bron = (data ?? {}) as Record<string, unknown>;
  const result = {} as Record<string, string>;
  for (const key of Object.keys(defaults)) {
    result[key] = veld(bron[key], defaults[key]);
  }
  return result as T;
}

export function mergeSiteContent(data: unknown): SiteContent {
  const bron = (data ?? {}) as {
    stats?: unknown;
    gasten?: unknown;
    radio?: unknown;
    links?: unknown;
  };

  const gasten = Array.isArray(bron.gasten)
    ? bron.gasten.filter(
        (g): g is string => typeof g === "string" && g.trim() !== ""
      )
    : [];

  return {
    stats: veldenVan(bron.stats, DEFAULT_CONTENT.stats),
    gasten: gasten.length > 0 ? gasten : DEFAULT_CONTENT.gasten,
    radio: veldenVan(bron.radio, DEFAULT_CONTENT.radio),
    links: veldenVan(bron.links, DEFAULT_CONTENT.links),
  };
}

export function spotifyEmbedUrl(link: string): string {
  return `${link.replace("open.spotify.com/", "open.spotify.com/embed/")}?theme=0`;
}
```

- [ ] **Step 4: Draai de tests — ze moeten slagen**

```bash
npx vitest run sanity/lib/content.test.ts
```

Expected: PASS, 6 tests groen.

- [ ] **Step 5: Voeg een test-script toe aan `package.json`**

In `package.json` onder `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 6: Commit**

```bash
git add sanity/lib/content.ts sanity/lib/content.test.ts package.json
git commit -m "Sanity: contentlaag met defaults, merge-fallbacks en embed-helper (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Client, query en integratie in de homepage

**Files:**
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/queries.ts`
- Create: `sanity/lib/getSiteContent.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `projectId`, `dataset`, `apiVersion` (Task 1); `SiteContent`, `DEFAULT_CONTENT`, `mergeSiteContent`, `spotifyEmbedUrl` (Task 3)
- Produces: `async function getSiteContent(): Promise<SiteContent>` — de enige functie die `app/page.tsx` aanroept.

- [ ] **Step 1: Schrijf `sanity/lib/client.ts`**

`useCdn: false` zodat de Next.js fetch-cache (met `revalidate: 60`) de enige cachelaag is — geen dubbele staleness via de Sanity-CDN.

```typescript
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
```

- [ ] **Step 2: Schrijf `sanity/lib/queries.ts`**

```typescript
import { defineQuery } from "next-sanity";

export const SITE_CONTENT_QUERY = defineQuery(
  `*[_id == "siteInstellingen"][0]{ stats, gasten, radio, links }`
);
```

- [ ] **Step 3: Schrijf `sanity/lib/getSiteContent.ts`**

```typescript
import { client } from "./client";
import { SITE_CONTENT_QUERY } from "./queries";
import {
  DEFAULT_CONTENT,
  mergeSiteContent,
  type SiteContent,
} from "./content";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const data = await client.fetch(
      SITE_CONTENT_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
    return mergeSiteContent(data);
  } catch (err) {
    console.error("Sanity-fetch mislukt, defaults gebruikt:", err);
    return DEFAULT_CONTENT;
  }
}
```

- [ ] **Step 4: Pas `app/page.tsx` aan**

Wijzigingen ten opzichte van de huidige file (regelnummers van vóór de wijziging):

1. Verwijder de constanten `LINKS` (r. 4–12) en `GASTEN` (r. 14–31).
2. Importeer bovenaan:

```tsx
import { getSiteContent } from "../sanity/lib/getSiteContent";
import { spotifyEmbedUrl } from "../sanity/lib/content";
```

3. `TickerGroep` krijgt de gasten als prop:

```tsx
function TickerGroep({ gasten }: { gasten: string[] }) {
  return (
    <div className="ticker-groep">
      {gasten.map((naam) => (
        <span key={naam}>{naam}</span>
      ))}
    </div>
  );
}
```

4. `Home` wordt async en haalt content op; alle verwijzingen gaan via `content`:

```tsx
export default async function Home() {
  const { stats, gasten, radio, links } = await getSiteContent();
  ...
}
```

Vervang in de JSX (zelfde structuur, alleen de databronnen):
- `LINKS.podcast` → `links.podcast`, en zo voor alle `LINKS.*`-verwijzingen (cta's, tekst-links, footer, "Powered by Ambassade")
- Stats-blok (r. 88–101):

```tsx
<ul className="stats mono">
  <li>
    <strong>{stats.playlistVolgers}</strong> playlist-volgers
  </li>
  <li>
    <strong>{stats.instagramVolgers}</strong> op Instagram
  </li>
  <li>
    <strong>{stats.aantalAfleveringen}</strong> afleveringen
  </li>
  <li>
    <strong>{stats.afleveringMoment}</strong> nieuwe aflevering
  </li>
</ul>
```

- Panel-kop podcast (r. 125): `<span className="mono">Elke zondag — 15:00</span>` blijft vaste copy? Nee — gebruik het CMS-veld: `<span className="mono">{stats.afleveringMoment}</span>`
- Panel-kop playlist (r. 166): `<span className="mono">{stats.playlistVolgers} volgers</span>`
- Ticker (r. 115–120): twee keer `<TickerGroep gasten={gasten} />`
- Gastenlijst (r. 144–148): `gasten.map(...)`
- Podcast-embed (r. 153): `src={spotifyEmbedUrl(links.podcast)}`
- Playlist-embed (r. 186): `src={spotifyEmbedUrl(links.playlist)}`
- Radio-tijd (r. 206–210):

```tsx
<p className="radio-tijd">
  {radio.dag} <em>{radio.tijd}</em>
  <br />
  op GLXY.RADIO
</p>
```

De lopende tekst in de podcast-sectie ("Elke zondag schuift een artiest aan…") en alle overige copy blijven letterlijk staan.

- [ ] **Step 5: Verifieer met lege dataset (fallback-pad)**

```bash
npm run build
```

Expected: build slaagt. De dataset is nog leeg, dus de pagina moet met defaults renderen:

```bash
npm run dev &
sleep 8
curl -s http://localhost:3000 | grep -o "110K+" | head -1
curl -s http://localhost:3000 | grep -o "Ronnie Flex" | head -1
```

Expected: `110K+` en `Ronnie Flex` (defaults zichtbaar). Stop de dev-server.

- [ ] **Step 6: Draai alle tests en lint**

```bash
npm test && npm run lint
```

Expected: tests PASS, lint zonder errors.

- [ ] **Step 7: Commit**

```bash
git add sanity/lib/client.ts sanity/lib/queries.ts sanity/lib/getSiteContent.ts app/page.tsx
git commit -m "Homepage haalt veranderlijke content uit Sanity met 60s revalidate

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Dataset seeden en end-to-end verificatie

**Files:**
- Create: `sanity/seed.ndjson`

**Interfaces:**
- Consumes: documenttype `siteInstellingen` (Task 2); veldwaarden identiek aan `DEFAULT_CONTENT` (Task 3)

- [ ] **Step 1: Schrijf `sanity/seed.ndjson`**

Eén regel NDJSON, document-ID vast op `siteInstellingen` (waarden identiek aan `DEFAULT_CONTENT`):

```json
{"_id":"siteInstellingen","_type":"siteInstellingen","stats":{"playlistVolgers":"110K+","instagramVolgers":"46K","aantalAfleveringen":"142+","afleveringMoment":"Zondag 15:00"},"gasten":["Boef","Ronnie Flex","Typhoon","Diggy Dex","Adje","Jack $hirak","Kevin","Willem","Jordymone9","Eljero Elia","Rotjoch","FRNKIE","p.APE","Jordan Wayne","Rosales","Sor"],"radio":{"dag":"Maandag","tijd":"19:00 – 21:00"},"links":{"instagram":"https://www.instagram.com/pass.de.aux/","tiktok":"https://www.tiktok.com/@pass.de.aux","youtube":"https://www.youtube.com/@PASSDEAUX","podcast":"https://open.spotify.com/show/0oX4c3DeilewS7spH9Fyfl","playlist":"https://open.spotify.com/playlist/4QZ4F2Yxc6RLx7ybP0Ozn4","glxy":"https://glxy.radio/shows/pass-de-aux/","ambassade":"https://ambassade.nl"}}
```

- [ ] **Step 2: Importeer de seed in de production-dataset**

```bash
npx sanity@latest dataset import sanity/seed.ndjson production --replace
```

Expected: `Done!` met 1 geïmporteerd document. Bij een project-ID-klacht: prefix met de env-vars (zie Task 2, Step 4).

- [ ] **Step 3: Verifieer dat de data via de query binnenkomt**

```bash
npx sanity@latest documents get siteInstellingen
```

Expected: JSON van het document met alle velden gevuld.

- [ ] **Step 4: End-to-end check op de homepage**

```bash
npm run dev &
sleep 8
curl -s http://localhost:3000 | grep -o "110K+" | head -1
```

Expected: `110K+` — nu afkomstig uit Sanity (zelfde waarde als default; dat de fetch echt slaagt is in Step 3 aangetoond, en de fallback-log "Sanity-fetch mislukt" mag NIET in de dev-server-output verschijnen).

- [ ] **Step 5: Handmatige browser-verificatie (met gebruiker)**

Meld de gebruiker dat hij op `http://localhost:3000/studio` kan inloggen en bijvoorbeeld een gast kan toevoegen; na max. ~60s (na refresh) moet die op `http://localhost:3000` in de ticker staan. Dit is de acceptatietest uit de spec (verificatiepunt 3).

- [ ] **Step 6: Commit**

```bash
git add sanity/seed.ndjson
git commit -m "Sanity: seed met huidige sitecontent voor production-dataset

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Self-review (uitgevoerd bij schrijven)

- **Spec-dekking:** contentmodel (Task 2), embedded studio (Task 2), 60s revalidate (Task 4), defaults/merge-robuustheid (Task 3+4), seed (Task 5), CORS (Task 2), alle vier verificatiepunten uit de spec zijn belegd (build: T4S5; studio gevuld: T5S3/S5; wijziging <60s: T5S5; lege dataset → defaults: T4S5).
- **Placeholders:** geen; alle code volledig uitgeschreven.
- **Typeconsistentie:** veldnamen in schema (T2S1), types/defaults (T3S3), query (T4S2), seed (T5S1) en page-integratie (T4S4) zijn identiek gehouden.
