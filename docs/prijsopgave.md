# Prijsopgave — template

*Generieke basis voor een prijsopgave voor een kleine custom website.
Ingevulde versies leven als eigen bestand, bijv. `prijsopgave-pass-de-aux.md`.*

---

## ⚙️ Invulblad — verwijder dit blok voor verzending

**Werkwijze:** vul de parameters in, reken de tabellen door, vervang alle
`{{...}}`-placeholders, schrap de varianten die niet aangeboden worden, en
verwijder dit blok.

### Parameters

| Parameter | Richtwaarde | Toelichting |
|---|---|---|
| `{{KLANT}}` | | Naam klant/project |
| `{{DATUM}}` | | Datum opgesteld |
| `{{TARIEF}}` | €85/uur | Normaal zzp-tarief |
| `{{KORTING}}` | 0% | Vrienden-/netwerkkorting. **0% voor commerciële klanten** |
### Basisuren per aantal paginasoorten

Een paginasoort = een eigen sjabloon dat apart ontworpen en gebouwd wordt.
Contact, privacyverklaring en cookiemelding tellen **niet** mee — dat zijn
blokken of kale tekstpagina's zonder ontwerpwerk.

| Paginasoorten | Basisuren |
|---|---|
| 1 (alles op één pagina) | 24 |
| 2 | 29 |
| 3 | 34 |
| 4 | 40 |

Meer dan vier: reken +6 uur per extra soort.

### CMS-opslagen in uren

Tel op bij de basisuren. Meer paginasoorten kost meer CMS-werk: meer
contenttypes, meer velden, meer plekken waar content landt.

| CMS | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Geen | +0 | +0 | +0 | +0 |
| Keystatic (git-based) | +8 | +9 | +10 | +11 |
| Sanity (gehost) | +11 | +12 | +13 | +15 |
| Payload (self-hosted) | +18 | +20 | +22 | +24 |

### Rekenmodel

Reken per combinatie (omvang × CMS) op **totale uren**, niet door losse
deelbedragen op te tellen — anders rond je twee keer af en klopt het verschil
tussen varianten niet meer.

```
UREN  = basisuren (naar aantal paginasoorten) + CMS-opslag
NORM  = UREN × TARIEF                        → kolom "Normaal"
KORT  = NORM × KORTING                       → kolom "Korting"
PRIJS = NORM − KORT, afgerond op €50         → kolom "Te betalen"
JAAR1 = PRIJS + SLA × 12
Meerprijs CMS = PRIJS(met CMS) − PRIJS(zonder CMS)

EFFECTIEF_TARIEF = TARIEF × (1 − KORTING), afgerond op €5
```

Door afronding wijkt het werkelijke kortingspercentage per variant een procent
of twee af van `KORTING`. Dat is prima zolang de euro's kloppen — zet in de
opgave dat de bedragen leidend zijn. Schrijf het projecttarief als
"±{{EFFECTIEF_TARIEF}}"; **meerwerk en gestaakte projecten factureer je wél
tegen een hard bedrag** (geen ±, dat zijn factuurregels).

### SLA-bedragen bepalen

Marktband voor kleine sites is €30–120/maand.

| Variant | Opbouw | Richtprijs |
|---|---|---|
| Zonder CMS | hosting/updates + 1 uur contentwijzigingen per maand | €49 |
| Git-based CMS (Keystatic) | hosting/updates, klant doet content zelf | €35 |
| Gehost CMS (Sanity) | hosting/updates, klant doet content zelf | €35 |
| Self-hosted CMS (Payload) | idem + database, backups, migraties, major-upgrades | €65 |

De maandprijs staat los van het aantal paginasoorten — zelfde platform, zelfde
domein.

**Controleer of de maandprijs zichzelf dekt.** Trek de derdenrekeningen eraf
(zie *Hosting en domein* verderop — op Vercel Pro is dat ±€20 per maand, op
Cloudflare ±€2) en deel de rest door je uurtarief. Beloof je "1 uur
contentwijzigingen" bij €49 op Vercel Pro, dan blijft er €29 over — ruim
onvoldoende. Kies een goedkoper platform, verhoog de prijs, verklein de belofte,
of noteer bewust dat je het weggeeft.

### Voor verzending

- Schrap de kortingsregel volledig bij commerciële klanten — niet op 0% zetten.
- Bied niet alle vier de CMS'en aan als er maar één realistisch is; het maakt
  het stuk onleesbaar.
- Controleer de marktcijfers in *Marktcontext* en de CMS-limieten; die
  verouderen jaarlijks.
- `grep -n '{{' docs/prijsopgave-<klant>.md` — moet niets opleveren.

---

# Prijsopgave — {{KLANT}}

*Opgesteld: {{DATUM}} · Alle bedragen ex. btw{{ · Ontwikkeling met KORTING% vriendenkorting}}*

> **Scope staat nog open.** Deze opgave prijst twee keuzes los van elkaar: hoe
> groot de site wordt, en of er een CMS onder komt. Alle combinaties staan
> uitgerekend. *(Blok schrappen als de scope al vaststaat.)*

## De site

{{Eén zin: wat voor site, voor wie, met welk doel.}}

- {{Design: custom of template, in welke huisstijl}}
- {{Bijzondere onderdelen: animaties, interactieve elementen}}
- {{Secties/inhoud}}
- {{Integraties en externe links: socials, embeds, diensten van derden}}
- Gebouwd met Next.js (App Router), responsive, gedeployed op Vercel
- Geen template — volledig custom design- en developmentwerk

**Inbegrepen, geen meerprijs:**

- **SEO** — metadata, Open Graph/social previews, sitemap, robots.txt,
  gestructureerde data (schema.org)
- **GEO** — vindbaarheid in AI-antwoorden (ChatGPT, Perplexity, Google AI
  Overviews): schone semantische HTML, expliciete feitelijke content over wie
  {{KLANT}} is, geen content die alleen in JavaScript bestaat
- **Pagespeed** — Core Web Vitals in het groen: geoptimaliseerde afbeeldingen,
  fonts zonder layout shift, lazy-loaded embeds

Bij een bureau staat dit als aparte post op de offerte (doorgaans €300–800).
Hier zit het in de bouw omdat het achteraf inbouwen duurder is dan meteen goed
doen.

## Keuze 1 — hoeveel paginasoorten?

Een **paginasoort** is een eigen indeling die apart ontworpen en gebouwd wordt.
Niet het aantal pagina's is het werk, maar het aantal *sjablonen*: elke soort
krijgt een eigen indeling, eigen gedrag op mobiel en eigen SEO-instellingen.

**Contact telt niet mee als paginasoort** — dat wordt een blok onderaan de
pagina. Hetzelfde geldt voor een privacyverklaring of cookiemelding.

| Aantal | Wat dat is | Werk |
|---|---|---|
| **1** | Alles op één pagina, secties onder elkaar | ±24 uur |
| **2** | Home plus één eigen pagina | ±29 uur |
| **3** | Home plus twee | ±34 uur |
| **4** | Home plus drie | ±40 uur |

**Per onderdeel de toets — is één "ja" genoeg, dan verdient het een eigen
pagina:**

- Wil je dit los aan iemand kunnen sturen?
- Moet dit apart in Google gevonden worden?
- Groeit dit elke maand aan?

Drie keer nee? Dan is het een sectie op de homepage en betaalt u er niets extra
voor.

## Keuze 2 — komt er een CMS onder?

| | Type | Kosten van de dienst | Klant logt in met | Voor wie |
|---|---|---|---|---|
| **Geen CMS** | — | — | — | Content verandert een paar keer per jaar |
| **Keystatic** | Git-based — content als bestanden in de repo | Gratis, open source | GitHub-account | Budgetoptie; alleen als de klant een GitHub-account wil |
| **Sanity** ⭐ | Gehost | Gratis tier volstaat ruim | Google of e-mail | **Aanbevolen.** Makkelijkste inlog, beste beeldbeheer, geen infrastructuur |
| **Payload** | Self-hosted, in onze eigen app | Software gratis (MIT), infra apart | Eigen account | Alleen bij accounts, ledengedeelte of webshop later |

### Wat er per optie gebeurt

**Keystatic** — editor-scherm op `/keystatic`; elke wijziging wordt een commit
en triggert een deploy. Geen database, geen externe dienst, nooit
maandelijkse kosten. *De vangst:* inloggen via GitHub, en na opslaan één à twee
minuten voor het live staat. Voor niet-technische klanten een echte drempel.

**Sanity** — aparte Studio, inloggen met Google. Beeldbeheer (uploaden,
bijsnijden, automatisch optimaliseren) is hier het beste. Gratis tier: 20
gebruikersplekken, 10.000 documenten, 500K API-requests/maand.

**Payload** — Next.js-plugin binnen de eigen app. Vraagt een database (Neon
Postgres), een opslagadapter voor media (lokale opslag werkt niet op Vercel —
ephemeral filesystem), gebruikersbeheer en migraties. De uren zitten in die
infrastructuur, niet in de schema's.

### Ook bekeken, afgevallen

- **TinaCMS** — git-based met visueel bewerken, maar duwt richting het betaalde
  Tina Cloud voor authenticatie.
- **Decap CMS** (voorheen Netlify CMS) — meest gevestigd, maar sinds de rebrand
  trager in ontwikkeling en met een verouderde editor.
- **Contentful, Storyblok, Prismic, Cosmic** — degelijke gehoste concurrenten;
  krappere gratis tiers (5–10 gebruikers tegenover Sanity's 20) en geen voordeel
  op deze schaal.
- **Strapi** — self-hosted zoals Payload, zonder de Next.js-integratie die
  Payload aantrekkelijk maakt.
- **WordPress (headless)** — een tweede systeem om te onderhouden en beveiligen,
  zonder winst.

## Prijzen — alle combinaties

Normaal tarief {{TARIEF}}, korting {{KORTING}}%, dus **±{{EFFECTIEF_TARIEF}}**.
Eindbedragen afgerond op €50.

### Eenmalig — wat u betaalt

| Paginasoorten | Zonder CMS | + Keystatic | + Sanity ⭐ | + Payload |
|---|---|---|---|---|
| **1** | €{{prijs}} | €{{prijs}} | €{{prijs}} | €{{prijs}} |
| **2** | €{{prijs}} | €{{prijs}} | €{{prijs}} | €{{prijs}} |
| **3** | €{{prijs}} | €{{prijs}} | €{{prijs}} | €{{prijs}} |
| **4** | €{{prijs}} | €{{prijs}} | €{{prijs}} | €{{prijs}} |

### Hoe die bedragen zijn opgebouwd

| Paginasoorten | Zonder CMS | + Keystatic | + Sanity | + Payload |
|---|---|---|---|---|
| **1** | {{u}} uur | {{u}} uur | {{u}} uur | {{u}} uur |
| **2** | {{u}} uur | {{u}} uur | {{u}} uur | {{u}} uur |
| **3** | {{u}} uur | {{u}} uur | {{u}} uur | {{u}} uur |
| **4** | {{u}} uur | {{u}} uur | {{u}} uur | {{u}} uur |

Uren × {{TARIEF}} normaal tarief, daar {{KORTING}}% vanaf, afgerond op €50.

Het CMS wordt met elke extra paginasoort iets duurder: meer contenttypes, meer
velden, meer plekken waar content moet landen.

**De korting geldt op al het ontwikkelwerk** — de bouw zelf én eventueel
meerwerk, dat tegen {{EFFECTIEF_TARIEF}} gaat in plaats van {{TARIEF}}. De SLA
staat los en gaat tegen normaal tarief; dat is geen korting maar ook geen
opslag, het zit marktconform in de band van €30–120 per maand.

Het kortingspercentage komt door de afronding per variant een procent of twee
af; de genoemde euro's zijn leidend.

## Marktcontext (Nederland, 2026)

- Een one-pager kost commercieel **€400–1.500**; professioneel custom werk zit
  aan de bovenkant of erboven. Volledig custom werk zit bij een bureau eerder op
  **€2.000–3.000**, met meer pagina's en CMS-werk €4.000–6.000.
- Onderhoudscontracten voor kleine sites: **€30–120 per maand**.
- Mijn normale zzp-tarief is **{{TARIEF}}** (markttarief zzp: €75–95/uur,
  agency: €110–140/uur).{{ Voor dit project reken ik ±EFFECTIEF_TARIEF.}}

## SLA (per maand)

| | Zonder CMS | Keystatic | Sanity | Payload |
|---|---|---|---|---|
| Hosting (Vercel) & domeinbeheer | ✔ | ✔ | ✔ | ✔ |
| Updates & security (dependencies, monitoring) | ✔ | ✔ | ✔ | ✔ |
| Bugs in opgeleverd werk | kosteloos | kosteloos | kosteloos | kosteloos |
| Kleine contentwijzigingen | 1 uur/maand via mij | klant zelf | klant zelf | klant zelf |
| Database-onderhoud, backups & migraties | n.v.t. | n.v.t. | n.v.t. | ✔ |
| **Prijs** | **€{{SLA1}}/maand** | **€{{SLA2}}/maand** | **€{{SLA3}}/maand** | **€{{SLA4}}/maand** |

De maandprijs is gelijk ongeacht het aantal paginasoorten.

### Hosting en domein — wat kost dat nou echt?

De maandprijs is één bedrag, maar er zitten drie dingen in die vaak door elkaar
lopen: **rekeningen van derden** (hosting, domein), **de CMS-dienst zelf** (bij
alle vier €0) en **mijn tijd** (updates, security, monitoring,
bereikbaarheid).

| Per maand | Vercel Pro | Cloudflare Pages | Nederlandse VPS |
|---|---|---|---|
| Hostingplatform | €19 ($20) | €0 | €5–15 |
| Domeinnaam (±€20/jaar .nl) | €1,70 | €1,70 | €1,70 |
| CMS-dienst (alle vier de opties) | €0 | €0 | €0 |
| Database & mediaopslag (alleen Payload) | ±€1 | ±€1 | inbegrepen |
| **Rekeningen van derden** | **±€21** | **±€2** | **±€7–17** |

> ⚠️ **Reken dit na vóór je de maandprijzen vaststelt.** Trek de derdenrekening
> van de maandprijs af; wat overblijft is jouw tijd. Bij €35 op Vercel Pro
> blijft €15 over — achttien minuten op €50, terwijl je updates, security,
> monitoring én bereikbaarheid belooft. Dat werkt niet.
>
> Opties: Cloudflare Pages gebruiken, de maandprijs verhogen, hosting apart
> doorbelasten, of bewust onder kostprijs gaan.

- **Vercel Pro is $20/maand per ontwikkelaarsplek, niet per site.** Draaien er
  meerdere klantsites op één abonnement, dan zakt het aandeel per site. Bij één
  site betaal je de volle $20 voor die site.
- **Vercel Hobby is geen optie:** Vercel rekent "een betaalde ontwikkelaar bouwt
  het" al als commercieel gebruik, ook als de site niets verkoopt.
- **Cloudflare Pages staat commercieel gebruik wél toe** op de gratis tier, met
  onbeperkte bandbreedte. Netlify ook (tot 100 GB). Beide kosten extra werk om
  Next.js erop te krijgen.
- **Alle vier de CMS-opties kosten €0 aan licenties.**

**Nederlandse hosting?** Alleen voor het domein. Standaard NL-webhosting is
PHP-gebouwd en draait geen Node (Vimexx niet, de meeste budgetpakketten
evenmin). Wat overblijft is een VPS — dan word jij systeembeheerder: OS-updates,
SSL, Node-versies, deploy-pijplijn, back-ups, monitoring. Eén uur per maand kost
meer dan de €19 die je bespaart, en beeldoptimalisatie, edge-caching,
preview-deploys en terugrollen vervallen. Wordt pas logisch bij meerdere
klantsites op één server.

**Domeinnaam:** registreer op naam van de klant, met beheertoegang voor jou.
Nooit op eigen naam — dat maakt afscheid nemen een gesprek. Reken ±€20/jaar bij
verlenging voor een .nl; eerste jaar is bij veel registrars een euro of niets.
Betaalt de klant zelf, dan gaat er €1,70 per maand vanaf.

### Bugs zijn mijn rekening, niet die van de klant

Werkt iets niet zoals afgesproken, dan repareer ik dat kosteloos — **en het gaat
niet van het uur contentwijzigingen af.** Dat uur is er voor nieuwe wensen, niet
om fouten van mij mee te betalen. Dit geldt ook zonder SLA: opgeleverd werk hoort
te werken.

| | Voorbeeld | Wie betaalt |
|---|---|---|
| **Bug** — het doet niet wat is afgesproken | Menu klapt niet open op mobiel; een embed laadt niet; tekst valt over de knop heen; site is traag terwijl pagespeed beloofd was | Ik, kosteloos |
| **Wijziging** — het doet wat is afgesproken, maar je wilt iets anders | "Kan die sectie hogerop?"; een item toevoegen; andere kleur; extra link | 1 uur/maand SLA, daarna {{EFFECTIEF_TARIEF}} |
| **Onderhoud** — buiten ons beide om stukgegaan | Een externe dienst verandert z'n embed; een dependency-update breekt iets; browserwijziging | SLA |

Bij twijfel: als jij het zonder blozen aan iemand anders zou kunnen laten zien
als "zo is 'ie bedoeld", is het een wijziging. Zo niet, dan is het een bug.

**De logica achter de SLA-prijzen:** zonder CMS loopt elke tekstwijziging via
mij — daar zit een uur werk per maand in. Mét CMS beheert de klant de content
zelf en dekt de SLA vooral hosting, updates en beschikbaarheid. Payload is per
maand juist **duurder**, ondanks dat de klant zelf beheert: er staat een
database onder die backups, monitoring en schema-migraties nodig heeft, en
majorversies vragen echt upgradewerk. Die uren verdwijnen niet omdat de klant
kan inloggen.

### Eerste jaar, alles bij elkaar

| Combinatie | Eenmalig | SLA (12×) | **Jaar 1** | Vanaf jaar 2 |
|---|---|---|---|---|
| One-pager, geen CMS | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |
| One-pager + Keystatic | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |
| One-pager + Sanity | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |
| One-pager + Payload | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |
| Multi-pager, geen CMS | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |
| Multi-pager + Keystatic | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |
| Multi-pager + Sanity | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |
| Multi-pager + Payload | €{{prijs}} | €{{sla12}} | **€{{jaar1}}** | €{{sla12}} |

### Infrastructuur bij Payload (niet in bovenstaande bedragen)

- **Neon Postgres** — gratis tier (0,5 GB opslag, 100 compute-uren/maand,
  commercieel gebruik toegestaan) volstaat voor sites van deze omvang. Betaalde
  plannen zijn verbruiksgebaseerd zonder maandelijks minimum.
- **Vercel Blob of S3** voor geüploade media — kleine bedragen, niet nul.
- **Vercel Pro (±€18/maand)** wordt lastiger te vermijden: de admin draait
  server-side.

Bij Keystatic en Sanity is de infrastructuur €0.

### Waarom een gehost CMS meestal de aanbeveling is

- **Makkelijkste inlog** — Google-account, geen GitHub. Voor een niet-technische
  klant het belangrijkste verschil met een git-based CMS.
- **Wijzigingen direct zichtbaar**, geen deploy van één à twee minuten.
- **Beeldbeheer** — uploaden, bijsnijden en optimaliseren zit erin.
- **Geen eigen infrastructuur** — geen database om te provisionen of backuppen.
- **Laagste SLA-druk** — het CMS staat los van de site; een kapotte update legt
  de site nooit plat. Bij Payload deelt het CMS de deploy met de site.

**Wanneer Keystatic slimmer is:** budget knelt en de klant vindt een
GitHub-account niet erg. De content zit dan bovendien voor altijd in de repo.

**Wanneer Payload de betere keuze is:** gebruikersaccounts, ledengedeelte,
e-commerce of complexe relationele content.

## Afspraken & betaling

**Geen aanbetaling.** Betaling volledig achteraf — er wordt niets vooruit
gevraagd. Wat wél vooraf vastligt is *wat* er gebouwd wordt.

*(Bij onbekende/commerciële klanten: overweeg 50% bij akkoord, 50% bij
oplevering. Het vangnet hieronder is dan minder kritiek.)*

### Betaling

- **Factuur bij livegang**, betaaltermijn 30 dagen.
- **Vangnet:** staat de site technisch klaar maar wacht livegang op de klant
  (content, foto's, domein, akkoord), dan gaat de factuur 30 dagen na "technisch
  gereed" alsnog de deur uit.
- **SLA** start op de dag van livegang, maandelijks opzegbaar.
- Wordt het project onderweg gestaakt, dan worden de gemaakte uren gefactureerd
  tegen {{EFFECTIEF_TARIEF}} — niet het volledige bedrag.

### Wat de prijs omvat

- De gekozen omvang en CMS-variant, met de secties zoals in *De site* beschreven
- **Twee revisierondes op het design**
- **Eén revisieronde op de teksten** — redactie van wat de klant aanlevert
- SEO/GEO/pagespeed zoals hierboven, technische oplevering en livegang
- **Bugs herstellen, kosteloos en onbeperkt** — ook zonder SLA

### Wat meerwerk is ({{EFFECTIEF_TARIEF}}, altijd vooraf afgestemd)

- Extra pagina's of secties die niet in de afgesproken opzet stonden — **een
  one-pager die tijdens de bouw een multi-pager wordt, is een nieuwe opgave,
  geen meerwerk**
- Revisierondes voorbij de bovenstaande, of een koerswijziging nadat het design
  akkoord was
- Teksten schrijven in plaats van redigeren
- Fotografie, videobewerking, logo- of huisstijlwerk
- Functionaliteit die niet besproken is (webshop, ticketing, ledengedeelte,
  nieuwsbriefkoppeling)

Meerwerk is geen straf en geen verrassing: het gaat er alleen in als het vooraf
benoemd en akkoord is.

### Later alsnog uitbreiden

- **CMS later toevoegen** kost hetzelfde als nu — de meerprijs uit de tabel. Er
  gaat niets verloren door te wachten.
- **Van one-pager naar multi-pager** kost ±25% meer dan het meteen zo bouwen,
  omdat de bestaande pagina opgeknipt en heringericht moet worden.

### Aanlevering door de klant

Nodig om te kunnen bouwen: teksten, logo in vector, beeldmateriaal met
gebruiksrechten, socialslinks, en toegang tot het domein. **Deadline voor
aanlevering wordt bij akkoord afgesproken.** Komt het later, dan schuift de
opleverdatum mee.

## Kanttekeningen

- De urenschattingen gelden bij een one-pager van 5–7 secties en een multi-pager
  van 4–6 pagina's. Loopt de scope daar duidelijk overheen, dan volgt een
  bijgestelde opgave vóór de bouw begint — niet achteraf.
- Vercel's gratis Hobby-tier is formeel niet bedoeld voor commercieel gebruik.
  Zo nodig komt **Vercel Pro (±€18/maand)** bovenop de SLA.
- Domeinregistratie (±€20/jaar bij verlenging) wordt doorbelast binnen de maandprijs en staat op naam van de klant.
- Gratis CMS-tiers volstaan bij kleine contentmodellen; groeit het gebruik, dan
  kan een betaald plan nodig worden (Sanity Growth: $15/gebruiker/maand).

## Bronnen

- [Stuurlui — Wat kost een website laten maken in 2026?](https://stuurlui.nl/blog/website-laten-maken-kosten/)
- [Goedgestart — Compleet prijsoverzicht 2026](https://goedgestart.nl/kennisbank/wat-kost-website-laten-maken-2026/)
- [Brightbrands — Website onderhoud kosten 2026: €30 tot €150 per maand](https://brightbrands.online/website/website-onderhoud-kosten/)
- [Website Visie — Wat kost onderhoud van een website?](https://websitevisie.nl/website/wat-kost-onderhoud-van-een-website/)
- [Slyck — Onderhoudscontract vs. onderhoudspakket](https://www.slyck.nl/blogs/website-onderhoud-kosten)
- [Sanity pricing 2026 — free, growth en wanneer gratis opraakt](https://nayankyada.com/blog/sanity-cms-pricing-in-2026-free-plan-growth-and-when-you-need-enterprise)
- [Keystatic CMS Review 2026](https://www.luckymedia.dev/insights/keystatic)
- [Keystatic vs TinaCMS — vergelijking](https://www.luckymedia.dev/compare/keystatic-vs-tina-cms)
- [Decap CMS Review 2026](https://www.luckymedia.dev/insights/decap-cms)
- [Payload CMS pricing 2026 — the real infrastructure cost breakdown](https://nayankyada.com/blog/payload-cms-pricing-2026-the-real-infrastructure-cost-breakdown)
- [Payload CMS Hosting Guide — Vercel, Docker & Cloudflare](https://www.buildwithmatija.com/payload-cms-hosting)
- [Neon Postgres — free tier op Vercel, kosten toegelicht](https://devradar.dev/guides/neon-database-on-vercel-free-tier-explained-cost-clarification)
