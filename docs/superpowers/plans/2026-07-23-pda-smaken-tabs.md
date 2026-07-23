# Smaken-artifact als tabs met mini-homepages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Het bestaande smaken-artifact ombouwen naar één pagina met een sticky smaak-kiezer (1–7) waarbij elke smaak een complete mini-homepage is met identieke fictieve content.

**Architecture:** Eén zelfstandig HTML-bestand. Elke smaak blijft één `<section class="smaak <naam>">`, maar wordt een tab-paneel met identieke binnen-structuur (nav, hero, afleveringen, playlist, live, footer, specimen-strook). Skinning gebeurt puur via CSS scoped op de bestaande smaak-classes; de bestaande gimmicks (eq, tape, auxlijn, neonbord, studioscene) verhuizen naar een vaste gimmick-slot in de hero. Een paar regels vanilla JS wisselt panelen.

**Tech Stack:** Vanilla HTML/CSS/JS, systeemfonts, geen externe assets (artifact-CSP). Verificatie via Playwright-screenshots van de lokale file.

## Global Constraints

- Werkbestand (canoniek, NIET in git): `/private/tmp/claude-501/-Users-kaiser-WebstormProjects-Pass-De-Aux/4b7164bf-71d7-4dc3-ada3-f2595887642b/scratchpad/pda-smaken.html`
- Publiceren op bestaande artifact-URL: `https://claude.ai/code/artifact/afb73b43-ed8d-4a71-8709-994af10e5a30`
- Geen externe hosts (CSP): geen webfonts, geen CDN, geen externe afbeeldingen.
- Geen `<!doctype>`/`<html>`/`<head>`/`<body>`-tags — de artifact-runtime wikkelt het bestand zelf in.
- `prefers-reduced-motion: reduce` schakelt élke animatie uit (bestaande regels behouden, nieuwe animaties toevoegen aan dezelfde discipline).
- Alle zichtbare tekst in het Nederlands.
- Smaken en volgorde: 1 Nachtrit, 2 De Studio, 3 Speakerbox, 4 Bassbox, 5 De Flyer, 6 De Cassette, 7 De Aux.
- Identieke content in alle zeven panelen (zie contentdata in Task 2) — alleen de huid verschilt.
- Git-commits gelden alleen voor plan/spec in de repo; het HTML-bestand zelf leeft buiten de repo (bewust, zie memory `pda-smaken-file`).

### Vaste contentdata (in alle 7 smaken identiek)

- Nav-menu: `Afleveringen · Playlist · Live`
- Hero-tagline: "De podcast over Nederlandse hiphop — wie de aux heeft, bepaalt wat er speelt."
- CTA's: `Luister de podcast` (vol) / `Volg de playlist` (lijn) + `Live`-badge
- Afleveringen (nummer — titel — gast — duur):
  - `#142 — Tien jaar in het spel — Boef — 1u 12m`
  - `#141 — Alles is een demo — Ronnie Flex — 58m`
  - `#140 — De kunst van de pauze — Typhoon — 1u 04m`
  - `#139 — Schrijven in de trein — Diggy Dex — 49m`
- Playlist-blok: titel "De Playlist", sub "Elke maandag vers van de aux", stat "110K saves", volgknop "Volg op Spotify", afspeel-driehoek in cover-vlak.
- Live-blok: "Zondag 15:00 — live op GLXY" + live-badge + sub "Kijk mee met de opname, praat mee in de chat."
- Footer: `Instagram · TikTok · YouTube · Spotify` + "© 2026 Pass De Aux"
- Specimen-strook: fontnaam-regel + paletchips, 1-op-1 overgenomen uit de huidige kaarten.

---

### Task 1: Tab-chrome en paneel-skelet

**Files:**
- Modify: `/private/tmp/claude-501/-Users-kaiser-WebstormProjects-Pass-De-Aux/4b7164bf-71d7-4dc3-ada3-f2595887642b/scratchpad/pda-smaken.html`

**Interfaces:**
- Produces: `.smaakbalk` (sticky tab bar) met 7 `button.smaaktab[data-doel]`; elke bestaande `section.smaak` krijgt `id="smaak-N"` + `hidden`-attribuut behalve smaak 1; JS-functie die `hidden` togglet en `aria-pressed` bijwerkt. Latere tasks bouwen ín de panelen, de tab-chrome verandert daarna niet meer.

- [ ] **Step 1: Sticky smaakbalk toevoegen** — direct na `</header>`:

```html
<nav class="smaakbalk" aria-label="Kies een smaak">
  <button class="smaaktab" data-doel="smaak-1" aria-pressed="true">1 · Nachtrit</button>
  <button class="smaaktab" data-doel="smaak-2" aria-pressed="false">2 · De Studio</button>
  <button class="smaaktab" data-doel="smaak-3" aria-pressed="false">3 · Speakerbox</button>
  <button class="smaaktab" data-doel="smaak-4" aria-pressed="false">4 · Bassbox</button>
  <button class="smaaktab" data-doel="smaak-5" aria-pressed="false">5 · De Flyer</button>
  <button class="smaaktab" data-doel="smaak-6" aria-pressed="false">6 · De Cassette</button>
  <button class="smaaktab" data-doel="smaak-7" aria-pressed="false">7 · De Aux</button>
</nav>
```

- [ ] **Step 2: Panel-ids en start-toestand** — geef de zeven `section.smaak` de ids `smaak-1` t/m `smaak-7` (volgorde als in Global Constraints) en zet `hidden` op smaak 2–7.

- [ ] **Step 3: Smaakbalk-CSS** (neutraal, volgt licht/donker via bestaande variabelen):

```css
.smaakbalk {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding: 0.6rem 0.25rem;
  margin: 0 0 1.5rem;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.smaaktab {
  flex: 0 0 auto;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--rand);
  background: var(--kaart);
  color: var(--tekst);
  cursor: pointer;
  white-space: nowrap;
}
.smaaktab[aria-pressed="true"] {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--kaart);
}
.smaaktab:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

- [ ] **Step 4: Wissel-JS** — onderaan het bestand, vóór de sluitende `</div>` is niet nodig; plaats als los `<script>` aan het eind:

```html
<script>
  document.querySelectorAll(".smaaktab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".smaaktab").forEach((t) => t.setAttribute("aria-pressed", t === tab ? "true" : "false"));
      document.querySelectorAll(".smaak").forEach((s) => (s.hidden = s.id !== tab.dataset.doel));
      document.querySelector(".smaakbalk").scrollIntoView({ block: "start" });
    });
  });
</script>
```

- [ ] **Step 5: Kop-tekst bijwerken** — h1 blijft "Zeven smaken, één gesprek"; intro-alinea aanpassen naar: "Geen specimen-kaarten meer — zeven complete mini-homepages met dezelfde inhoud in een andere huid. Tik een smaak en vergelijk."

- [ ] **Step 6: Verifiëren** — open `file:///private/tmp/claude-501/-Users-kaiser-WebstormProjects-Pass-De-Aux/4b7164bf-71d7-4dc3-ada3-f2595887642b/scratchpad/pda-smaken.html` met Playwright, klik tab 4, screenshot. Verwacht: alleen Bassbox zichtbaar, tab 4 gemarkeerd, balk blijft bovenin staan bij scrollen.

---

### Task 2: Gedeelde mini-homepage-structuur + basis-CSS, referentie-implementatie in Nachtrit

**Files:**
- Modify: zelfde bestand.

**Interfaces:**
- Produces: het blok-sjabloon hieronder (classnamen `.mh-nav`, `.mh-hero`, `.mh-gimmick`, `.mh-afleveringen`, `.afl-kaart`, `.mh-playlist`, `.mh-live`, `.mh-footer`, `.specimen-strook`) + smaak-neutrale layout-CSS. Task 3 en 4 hergebruiken dit sjabloon letterlijk; per smaak verschillen alleen (a) de gimmick-slot-inhoud en (b) skin-CSS scoped op de smaak-class.

- [ ] **Step 1: Blok-sjabloon in `#smaak-1` plaatsen** — vervang de huidige binnen-inhoud van de Nachtrit-sectie (behalve `.smaak-kop` en `.smaak-sub`, die blijven bovenaan als kaart-titel) door:

```html
<div class="mini-home">
  <div class="mh-nav">
    <span class="mh-merk">Pass de Aux</span>
    <span class="mh-menu mono">Afleveringen · Playlist · Live</span>
  </div>
  <div class="mh-hero">
    <div class="specimen breed">Pass de <em>Aux</em></div>
    <p class="mh-tagline">De podcast over Nederlandse hiphop — wie de aux heeft, bepaalt wat er speelt.</p>
    <div class="componenten">
      <span class="knop knop-vol">Luister de podcast</span>
      <span class="knop knop-lijn">Volg de playlist</span>
      <span class="live">Live</span>
    </div>
  </div>
  <div class="mh-gimmick"><!-- per smaak: bestaande signatuur (strip/eq/tape/auxlijn/neonbord/scene) --></div>
  <div class="mh-afleveringen">
    <h3 class="mh-koptitel">Afleveringen</h3>
    <div class="afl-rij">
      <article class="afl-kaart"><span class="afl-nr mono">#142</span><h4>Tien jaar in het spel</h4><p>met Boef · 1u 12m</p></article>
      <article class="afl-kaart"><span class="afl-nr mono">#141</span><h4>Alles is een demo</h4><p>met Ronnie Flex · 58m</p></article>
      <article class="afl-kaart"><span class="afl-nr mono">#140</span><h4>De kunst van de pauze</h4><p>met Typhoon · 1u 04m</p></article>
      <article class="afl-kaart"><span class="afl-nr mono">#139</span><h4>Schrijven in de trein</h4><p>met Diggy Dex · 49m</p></article>
    </div>
  </div>
  <div class="mh-playlist">
    <div class="pl-cover" aria-hidden="true"><span class="pl-play"></span></div>
    <div class="pl-info">
      <h3 class="mh-koptitel">De Playlist</h3>
      <p>Elke maandag vers van de aux · 110K saves</p>
      <span class="knop knop-vol">Volg op Spotify</span>
    </div>
  </div>
  <div class="mh-live">
    <span class="live">Live</span>
    <div><h3 class="mh-koptitel">Zondag 15:00 — live op GLXY</h3><p>Kijk mee met de opname, praat mee in de chat.</p></div>
  </div>
  <div class="mh-footer">
    <span class="mono">Instagram · TikTok · YouTube · Spotify</span>
    <span class="mono">© 2026 Pass De Aux</span>
  </div>
</div>
<div class="specimen-strook">
  <span class="font-naam mono">Archivo Expanded Black · brede kapitalen</span>
  <div class="palet"><!-- bestaande chips van deze smaak, ongewijzigd hierheen verplaatst --></div>
</div>
```

- [ ] **Step 2: Smaak-neutrale layout-CSS toevoegen** (vóór de per-smaak-blokken):

```css
.mini-home { border-radius: 14px; overflow: hidden; margin-top: 1.25rem; border: 1px solid rgba(255,255,255,0.14); }
.mh-nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 0.9rem 1.25rem; }
.mh-merk { font-weight: 900; text-transform: uppercase; letter-spacing: 0.02em; }
.mh-menu { opacity: 0.7; }
.mh-hero { padding: 1.5rem 1.25rem 1.75rem; }
.mh-tagline { max-width: 44ch; margin: 0.75rem 0 1.25rem; font-size: 1rem; opacity: 0.85; }
.mh-hero .specimen { font-size: clamp(2.2rem, 7vw, 4rem); }
.mh-koptitel { margin: 0 0 0.35rem; font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; }
.mh-afleveringen { padding: 1.5rem 1.25rem; }
.afl-rij { display: grid; grid-template-columns: repeat(auto-fit, minmax(10.5rem, 1fr)); gap: 0.75rem; margin-top: 0.75rem; }
.afl-kaart { border-radius: 12px; padding: 0.9rem 1rem 1rem; }
.afl-kaart h4 { margin: 0.5rem 0 0.25rem; font-size: 0.98rem; line-height: 1.25; }
.afl-kaart p { margin: 0; font-size: 0.8rem; opacity: 0.75; }
.afl-nr { font-size: 0.66rem; opacity: 0.8; }
.mh-playlist { display: flex; align-items: center; gap: 1.25rem; padding: 1.5rem 1.25rem; }
.pl-cover { flex: 0 0 auto; width: 92px; height: 92px; border-radius: 12px; display: grid; place-items: center; }
.pl-play { width: 0; height: 0; border-style: solid; border-width: 12px 0 12px 20px; border-color: transparent; }
.pl-info p { margin: 0 0 0.9rem; font-size: 0.88rem; opacity: 0.8; }
.mh-live { display: flex; align-items: center; gap: 1.25rem; padding: 1.5rem 1.25rem; }
.mh-live p { margin: 0; font-size: 0.88rem; opacity: 0.8; }
.mh-footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem 1.5rem; padding: 1rem 1.25rem; font-size: 0.62rem; opacity: 0.85; }
.specimen-strook { margin-top: 1rem; }
.specimen-strook .font-naam { margin-bottom: 0.5rem; }
@media (max-width: 560px) { .mh-playlist, .mh-live { flex-direction: column; align-items: flex-start; gap: 0.9rem; } }
```

- [ ] **Step 3: Nachtrit-skin** — scoped op `.nachtrit`, met de bestaande kleuren (#101014 asfalt, #FFB03A amber, #FF4A2D signaal, #F2EDE3 bot): `.mini-home` achtergrond `#0b0b0e` met amber accentranden, `.mh-nav` onderrand `1px solid #262935`, `.afl-kaart` achtergrond `#17171d` met `#FFB03A` voor `#nr`, `.pl-cover` amber-gradient met asfalt-driehoek, `.mh-live` en `.mh-footer` gescheiden met dezelfde randlijn. De bestaande artiestenstrip verhuist naar `.mh-gimmick`.

- [ ] **Step 4: Verifiëren** — Playwright-screenshot van smaak 1. Verwacht: complete mini-homepage (nav t/m footer), strip als gimmick tussen hero en afleveringen, specimen-strook eronder met de 4 Nachtrit-chips.

---

### Task 3: Smaken 2–4 ombouwen (De Studio, Speakerbox, Bassbox)

**Files:**
- Modify: zelfde bestand.

**Interfaces:**
- Consumes: blok-sjabloon en classnamen uit Task 2 (letterlijk hetzelfde markup, andere gimmick-slot-inhoud en specimen-strook-chips).

- [ ] **Step 1: De Studio (`#smaak-2`)** — sjabloon plaatsen; specimen behoudt de Studio-typografie (Outfit-benadering, letterspacing 0.18em); gimmick-slot krijgt de bestaande `.studio-scene` + `.neonbord` (neonbord als afsluiter vóór de footer mag ook — kies wat mooier oogt, documenteer in commit-notitie); skin: stucwerk-achtergronden (#B3A28A/#EFE7D6), afl-kaarten als "polaroids" op de tafelkleur, playlist-cover met neon-druppel, footer espresso (#221C14). Chips (6 stuks) 1-op-1 naar de specimen-strook.
- [ ] **Step 2: Speakerbox (`#smaak-3`)** — sjabloon; gimmick = bestaande artiestenstrip; skin: navy-wereld (#04182B/#05325B), cyaan accenten (#01D4EF), afl-kaarten op #05325b, pl-cover cyaan met navy-driehoek. Chips (4) naar strook.
- [ ] **Step 3: Bassbox (`#smaak-4`)** — sjabloon; gimmick = bestaande `.eq`; stickers (`.stickers`) blijven, verhuis ze naar de hero onder de CTA's; skin: bestaande maximaal-volume-stijl (rotaties, dubbele schaduwen #FF3DA6/#05325B, grille-stippen), afl-kaarten licht geroteerd (±1–2°, alternerend via `:nth-child`). Chips (5) naar strook.
- [ ] **Step 4: Verifiëren** — Playwright: screenshot per smaak (tab 2, 3, 4). Verwacht: zelfde blokken en content als smaak 1, herkenbaar andere huid, geen overgebleven oude kaart-restanten in deze panelen.

---

### Task 4: Smaken 5–7 ombouwen (De Flyer, De Cassette, De Aux)

**Files:**
- Modify: zelfde bestand.

**Interfaces:**
- Consumes: blok-sjabloon uit Task 2.

- [ ] **Step 1: De Flyer (`#smaak-5`)** — sjabloon; gimmick = bestaande strip (roze/geel, licht gedraaid); skin: clubnacht-wereld (#14061F, #FF3DA6, #3D5BFF, #FFE03D), alles bewust een beetje scheef (hero -2°, afl-kaarten alternerend ±1.5°), pl-cover duotoon magenta/blauw. Chips (4) naar strook.
- [ ] **Step 2: De Cassette (`#smaak-6`)** — sjabloon; gimmick = de bestaande `.tape` (compleet, incl. kant-chips) — dit ís de hero-illustratie, plaats hem in `.mh-gimmick` direct onder de hero; het `.lint`-svg sluit het paneel af vóór de specimen-strook; skin: beige-wereld (#EFE4CD/#453226/#E8632C/#F2B33D), afl-kaarten als tape-labels met streepjes-rand, handschrift (Bradley Hand-benadering) voor afl-titels. Chips (5) naar strook.
- [ ] **Step 3: De Aux (`#smaak-7`)** — sjabloon; gimmick = bestaande `.auxlijn` bovenin de hero (vóór het specimen, zoals nu) + `.platen` onder de CTA's + rijdende artiesten-`.strip` tussen playlist en live; skin: asfalt/kenteken-wereld (#0B0B0D, #FFCE00, #0D47A8, chroom-gradient), afl-kaarten met kentekenplaat-nummer (`.afl-nr` als geel plaatje met NL-band), wegmarkering als scheidingslijn tussen blokken. Chips (5) naar strook.
- [ ] **Step 4: Verifiëren** — Playwright: screenshots tab 5, 6, 7 — zelfde check als Task 3.

---

### Task 5: Opruimen, toegankelijkheid en motion-audit

**Files:**
- Modify: zelfde bestand.

- [ ] **Step 1: Dode CSS verwijderen** — regels die alleen de oude kaart-opzet bedienden en nergens meer matchen (grep per selector in het bestand; de gimmick-CSS blijft, die wordt hergebruikt).
- [ ] **Step 2: Reduced-motion-audit** — controleer dat álle animaties (bestaand: `gloei`, `bonk`, `draai`, `razen`; plus eventueel nieuwe) een `@media (prefers-reduced-motion: reduce)`-uitschakeling hebben.
- [ ] **Step 3: Toegankelijkheid** — decoratieve blokken `aria-hidden="true"`; tabs bedienbaar met toetsenbord (button-elementen zijn dat al); contrast van tekst op skin-achtergronden nalopen (met name Studio-stucwerk en Cassette-beige).
- [ ] **Step 4: Vragen-sectie en staart** — staan buiten de panelen, blijven altijd zichtbaar; controleer dat de intro-tekst van de vragen-sectie nog klopt ("zes vragen" — inhoudelijk laten zoals hij is, die verwijst naar de gespreksvragen-pagina).
- [ ] **Step 5: Eindverificatie** — Playwright: door alle 7 tabs klikken op desktop-breedte (1280) en smal (390): geen horizontale scroll op de body, tabs blijven sticky, content identiek per smaak.

---

### Task 6: Publiceren en administratie

**Files:**
- Modify: memory `/Users/kaiser/.claude/projects/-Users-kaiser-WebstormProjects-Pass-De-Aux/memory/pda-smaken-file.md`

- [ ] **Step 1: Publiceren** — Artifact-tool met `file_path` = canoniek bestand, `url` = bestaande artifact-URL (Global Constraints), titel via bestaande `<title>` ("Pass De Aux — zeven smaken"), description "Zeven merk-richtingen als complete mini-homepages, wisselbaar met tabs", favicon `🎧`, label `tabs-mini-homepages`.
- [ ] **Step 2: Controle op de gepubliceerde URL** — WebFetch of Playwright: pagina laadt, tabs wisselen.
- [ ] **Step 3: Memory bijwerken** — `pda-smaken-file.md`: vermelden dat de pagina sinds 2026-07-23 tabs met mini-homepages heeft (geen specimen-kaarten meer) en dat spec + plan in de repo staan onder `docs/superpowers/`.

## Self-review (uitgevoerd bij schrijven)

- Spec-dekking: sticky kiezer (T1), 7 mini-homepages met alle blokken (T2–T4), specimen-strook (T2–T4), vragen-sectie blijft (T5), CSP/motion/a11y (T5), zelfde URL + memory (T6). Geen gaten.
- Geen placeholders: per-smaak skins zijn gespecificeerd met exacte hexwaarden en welke bestaande gimmick waarheen gaat; het blok-sjabloon staat volledig uitgeschreven in Task 2 en wordt letterlijk hergebruikt.
- Naamconsistentie: `.mini-home`, `.mh-*`, `.afl-*`, `.pl-*`, `.specimen-strook`, `.smaakbalk`/`.smaaktab` — overal gelijk gebruikt.
