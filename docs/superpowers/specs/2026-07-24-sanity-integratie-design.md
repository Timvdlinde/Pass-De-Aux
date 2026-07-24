# Sanity-integratie op de Pass De Aux-site — Design

**Datum:** 2026-07-24
**Branch:** `sanity`
**Status:** goedgekeurd door Tim

## Doel

De veranderlijke content van de live one-pager (`app/page.tsx`) beheerbaar maken via Sanity CMS, zodat de klant zelf gasten, stats, uitzendtijden en links kan bijwerken zonder deploy. Vaste copy (hero-teksten, sectieteksten) blijft in code.

## Scope

**Wel via Sanity:**
- Stats: playlist-volgers, Instagram-volgers, aantal afleveringen, afleveringsmoment
- Gastenlijst (voedt zowel de ticker als de "Aan de aux geweest"-lijst)
- Radio-uitzending: dag + tijdvak
- Links: Instagram, TikTok, YouTube, Spotify-podcast, Spotify-playlist, GLXY, Ambassade

**Niet via Sanity:**
- Hero-copy, sectieteksten, footer-copy — blijven hardcoded
- Spotify-embed-URL's: afgeleid uit de podcast-/playlist-links (geen aparte velden)

## Beslissingen

| Vraag | Keuze |
| --- | --- |
| CMS-scope | Alleen veranderlijke data |
| Sanity-project | Nieuw project + `production`-dataset via CLI |
| Studio | Embedded op `/studio` in de Next-app |
| Versheid | Time-based revalidation, ~60 seconden |

## Contentmodel

Eén singleton-document `siteInstellingen`:

```
siteInstellingen (singleton)
├── stats
│   ├── playlistVolgers      string   "110K+"
│   ├── instagramVolgers     string   "46K"
│   ├── aantalAfleveringen   string   "142+"
│   └── afleveringMoment     string   "Zondag 15:00"
├── gasten                   array<string>  (sleepbaar te ordenen)
├── radio
│   ├── dag                  string   "Maandag"
│   └── tijd                 string   "19:00 – 21:00"
└── links
    ├── instagram, tiktok, youtube        url
    ├── podcast, playlist                 url (Spotify)
    └── glxy, ambassade                   url
```

## Architectuur

- **Dependencies:** `sanity`, `next-sanity`, `@sanity/vision`
- **Bestandsstructuur:**
  - `sanity.config.ts` (root) — studio-config met structure-aanpassing: `siteInstellingen` als vast enkel document (niet aan te maken of te verwijderen via "new document")
  - `sanity/env.ts` — leest `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, API-versie
  - `sanity/schemaTypes/` — schema voor `siteInstellingen`
  - `sanity/lib/client.ts` — next-sanity client
  - `sanity/lib/queries.ts` — GROQ-query voor de singleton
  - `app/studio/[[...tool]]/page.tsx` — embedded Studio-route
- **Datafetching:** `app/page.tsx` wordt een async server component; de singleton wordt opgehaald met 60s time-based revalidation op de fetch. Geen Cache Components / webhooks.
- **Robuustheid:** de huidige hardcoded waarden blijven als defaults in code; Sanity-data wordt eroverheen gemerged (per veld, met fallback). De site blijft werken als het document leeg of onbereikbaar is.
- **Seed:** de dataset wordt eenmalig gevuld met de huidige content, zodat de studio direct de echte waarden toont.
- **CORS:** `http://localhost:3000` als CORS-origin toevoegen via de CLI; productiedomein volgt bij deploy.

## Foutafhandeling

- Sanity onbereikbaar of document ontbreekt → defaults uit code, pagina rendert normaal.
- Leeg veld in Sanity (bv. lege string) → veld-fallback naar default.
- Studio-route is dynamisch en heeft geen invloed op de statische homepage.

## Verificatie

1. `next build` slaagt.
2. `/studio` laadt en toont het gevulde `siteInstellingen`-document.
3. Een wijziging in de studio (bv. gast toevoegen) is binnen ~60s zichtbaar op de homepage.
4. Met lege dataset rendert de homepage met defaults.
