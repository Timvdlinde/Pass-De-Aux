# Pass De Aux — smaken-artifact als tabs met mini-homepages

**Datum:** 2026-07-23
**Status:** goedgekeurd door Tim

## Doel

Het bestaande "Pass De Aux — zes smaken"-artifact (inmiddels zeven smaken) voelt niet
allesomvattend: per smaak staat er alleen een wordmark-specimen, paletchips, twee knoppen
en één gimmick. Voor de sparsessie met de klant moet elke smaak beoordeeld kunnen worden
als échte site, niet als specimen-kaart.

## Wat er komt

Eén zelfstandige HTML-pagina (zelfde artifact-URL als nu,
`https://claude.ai/code/artifact/afb73b43-ed8d-4a71-8709-994af10e5a30`) met:

### Sticky smaak-kiezer

- Bovenin, altijd zichtbaar: tabs 1–7 met smaaknaam (1 Nachtrit, 2 De Studio,
  3 Speakerbox, 4 Bassbox, 5 De Flyer, 6 De Cassette, 7 De Aux).
- Klikken wisselt de zichtbare mini-homepage direct (show/hide via een paar regels JS,
  geen scroll-jump). Eén smaak tegelijk zichtbaar; smaak 1 is de start.
- De kiezer zelf is neutraal vormgegeven (volgt licht/donker-thema), zodat hij geen
  smaak bevoordeelt.

### Mini-homepage per smaak (×7)

Identieke fictieve content in alle zeven — alleen de huid verschilt, zodat het
vergelijk eerlijk is. Blokken, in volgorde:

1. **Nav + hero** — wordmark, menu (Afleveringen · Playlist · Live), tagline, de twee
   CTA's ("Luister de podcast" / "Volg de playlist"), en de bestaande signatuur-gimmick
   van die smaak (eq-balken, cassette, aux-kabel, neonbord, studioscene, artiestenstrip)
   verwerkt in of direct onder de hero.
2. **Afleveringenrij** — vier afleveringskaarten met nummer, titel, gast en duur
   (afl. 142–139, gasten uit de bestaande artiestenlijst: Boef, Ronnie Flex, Typhoon,
   Diggy Dex).
3. **Playlist-blok** — Spotify-achtige embed-look (cover, tracklijst-suggestie,
   afspeelknop) met volgknop.
4. **Live-blok** — "Zondag 15:00 · live op GLXY" met de bestaande live-badge.
5. **Footer** — socials (fictieve links), kleine print.
6. **Specimen-strook** — compacte strook onder de footer met fontnaam + paletchips:
   de huidige kaartinhoud samengeperst, zodat die informatie niet verloren gaat.

### Blijft staan

- De gespreksvragen-sectie (link + kopieerknop) en de P.S. over systeemfonts, onderaan,
  buiten de tab-wissel — altijd zichtbaar.

## Techniek

- Eén HTML-bestand, geen externe assets (artifact-CSP staat geen externe hosts toe);
  systeemfonts als benadering, zoals nu.
- Canonieke file blijft `pda-smaken.html` in de bestaande scratchpad-locatie
  (zie memory `pda-smaken-file`); herpubliceren met de `url`-parameter zodat de
  artifact-URL gelijk blijft.
- Elke smaak houdt zijn vaste eigen kleurenwereld (geen licht/donker-varianten per
  smaak); alleen de omlijsting (tabs, vragen-sectie, achtergrond) volgt het thema via
  de bestaande CSS-variabelen.
- `prefers-reduced-motion` blijft gerespecteerd voor alle animaties.
- Tabs toegankelijk: knoppen met `aria-pressed`/`aria-controls`, geen dode links.

## Buiten scope

- Over/hosts-blok (bewust afgevallen: voegt voor het stijl-vergelijk het minst toe).
- Echte content, echte embeds, echte fonts — dit blijft een sparring-mockup.
- De losse smaak-artifacts (smaak 4/5/6 uit een eerdere ronde) worden niet bijgewerkt.

## Succescriteria

- Per smaak is in één oogopslag te zien hoe een complete homepage in die stijl voelt.
- Wisselen tussen smaken kost één tik, ook op een telefoon.
- Zelfde content overal: verschillen die je ziet zijn stijlverschillen, geen
  contentverschillen.
