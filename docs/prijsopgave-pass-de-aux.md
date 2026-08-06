# Prijsopgave — Pass De Aux website

*Opgesteld: 23 juli 2026 · Bijgewerkt: 1 augustus 2026 · Alle bedragen ex. btw ·
Ontwikkeling met 40% vriendenkorting*

<!-- Ingevulde versie van docs/prijsopgave.md (template).
     Parameters: tarief €85/uur · korting 40% · afronding €50
     Basisuren per paginasoort: 1=24 · 2=29 · 3=34 · 4=40
     CMS-opslagen: Keystatic +8/9/10/11 · Sanity +11/12/13/15 · Payload +18/20/22/24 -->

> **Scope staat nog open.** Deze opgave prijst twee keuzes los van elkaar:
> hoe groot de site wordt, en of er een CMS onder komt. Beide worden in de
> meeting van 6 augustus beslist. Alle combinaties staan hieronder uitgerekend.

## De site

Brandingsite voor Pass De Aux, het platform voor Nederlandse hiphop:

- Volledig custom design in eigen branding (cyaan/navy uit het speakerbox-logo, wordmark in logostijl)
- Aux-kabel signature-animatie (custom SVG-component)
- Gasten-ticker, secties voor podcast, playlist en radio
- Links naar Instagram, TikTok, YouTube, Spotify (podcast + playlist), GLXY Radio en Ambassade
- Gebouwd met Next.js (App Router), responsive, gedeployed op Vercel
- Geen template — volledig custom design- en developmentwerk

**Inbegrepen, geen meerprijs:**

- **SEO** — metadata, Open Graph/social previews, sitemap, robots.txt,
  gestructureerde data (schema.org: podcast, organisatie)
- **GEO** — vindbaarheid in AI-antwoorden (ChatGPT, Perplexity, Google AI
  Overviews): schone semantische HTML, expliciete feitelijke content over wie
  Pass De Aux is, geen content die alleen in JavaScript bestaat
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
pagina. Hetzelfde geldt voor een privacyverklaring of cookiemelding: losse
tekstpagina's zonder ontwerpwerk, die zitten er gewoon bij.

| Aantal | Wat dat is | Werk |
|---|---|---|
| **1** | Alles op één pagina, secties onder elkaar, navigatie scrollt | ±24 uur |
| **2** | Home plus één eigen pagina, bijv. een afleveringenarchief | ±29 uur |
| **3** | Home plus twee, bijv. archief en een pitchpagina voor merken | ±34 uur |
| **4** | Home plus drie, bijv. archief, over, partners | ±40 uur |

**Per onderdeel de toets — is één "ja" genoeg, dan verdient het een eigen
pagina:**

- Wil je dit los aan iemand kunnen sturen?
- Moet dit apart in Google gevonden worden?
- Groeit dit elke maand aan?

Drie keer nee? Dan is het een sectie op de homepage en betaal je er niets extra
voor.

## Keuze 2 — komt er een CMS onder?

Een CMS is de beheerbare achterkant: de plek waar u zelf teksten, links en de
gastenlijst aanpast zonder mij. **De vraag is alleen of u dat wilt — niet welk
systeem het wordt.** Dat kies ik, op basis van hoe u ermee gaat werken.

| | Wat het betekent | Kosten |
|---|---|---|
| **Geen CMS** | Wijzigingen stuurt u mij door; een uur per maand zit in de prijs | €49/maand onderhoud |
| **Wel een CMS** | U logt zelf in en past aan wanneer u wilt | +€500 of €650 eenmalig, daarna €35/maand onderhoud |

*Hosting komt daar los bij — zie <em>Maandelijkse kosten</em>.*

Hieronder staat wél waaruit ik kies, zodat u kunt zien dat de keuze niet
willekeurig is.

### Wat er per optie gebeurt

**Keystatic** — een editor-scherm op `/keystatic` waar de klant content bewerkt;
elke opgeslagen wijziging wordt een commit in de repo en triggert een nieuwe
deploy. Geen database, geen externe dienst, geen maandelijkse kosten ooit.
*De vangst:* inloggen gaat via GitHub, en na opslaan duurt het één à twee
minuten voor de wijziging live staat. Voor iemand die niet in code werkt is dat
een drempel — niet onoverkomelijk, wel echt.

**Sanity** — een aparte Studio-omgeving waar de klant inlogt met Google. Content
staat bij Sanity, de site haalt 'm op en ververst bij publicatie. Beeldbeheer
(uploaden, bijsnijden, automatisch optimaliseren) is hier duidelijk het beste.
De gratis tier biedt 20 gebruikersplekken en 10.000 documenten — voor deze site
niet in de buurt van de limiet.

**Payload** — draait als Next.js-plugin binnen onze eigen app.

### Waarom Payload zoveel duurder is

Voor jullie ziet het eindresultaat er hetzelfde uit: je logt in en past content
aan. Het verschil zit erachter. **Bij Sanity huur je een afgebouwd CMS; bij
Payload bouw je er zelf een.** Alles wat Sanity al geregeld heeft, moet bij
Payload gemaakt en daarna onderhouden worden:

| Wat er nodig is | Sanity | Payload |
|---|---|---|
| Database | Zit erin | Zelf provisionen, koppelen en de verbindingen instellen |
| Waar foto's terechtkomen | Eigen CDN, inbegrepen | Zelf een opslagkoppeling bouwen — Payload's standaard schrijft naar de schijf van de server, en die is op Vercel na elke update weer leeg |
| Inloggen & rechten | Sanity regelt de accounts | Zelf gebruikersbeheer inrichten |
| Later een veld toevoegen | Veld erbij, klaar | Migratie schrijven en uitrollen |
| Foto's bijsnijden/optimaliseren | Inbegrepen | Zelf regelen |
| Backups | Sanity's probleem | Mijn probleem |

Dat is **±7 uur extra bouwwerk** bovenop Sanity, en **€30 per maand extra** om
het draaiend te houden: de database heeft backups, monitoring en
schema-migraties nodig, en Payload-hoofdversies vragen echt upgradewerk.

**Payload is niet slechter — het is groter.** Diezelfde uren zijn precies wat je
wél wilt zodra er gebruikersaccounts, een ledengedeelte of een webshop bij
komen, want dan bouw je op iets dat daarvoor gemaakt is. Voor een site met
teksten, links en een gastenlijst betaal je voor een fundering onder een
gebouw dat er niet komt.

### Ook bekeken, afgevallen

- **TinaCMS** — git-based zoals Keystatic, met visueel bewerken erbij. Duwt je
  richting het betaalde Tina Cloud voor het inlogverhaal; dat maakt de
  gratis-optie minder gratis dan hij lijkt.
- **Decap CMS** (voorheen Netlify CMS) — het meest gevestigd van de git-based
  CMS'en, maar sinds de rebrand duidelijk trager in ontwikkeling en met een
  editor-interface die is blijven staan.
- **Contentful, Storyblok, Prismic, Cosmic** — degelijke gehoste concurrenten
  van Sanity. Geen van alle biedt hier iets wat Sanity niet heeft, en hun gratis
  tiers zijn krapper (5–10 gebruikers tegenover 20).
- **Strapi** — self-hosted zoals Payload, maar zonder de Next.js-integratie die
  Payload juist aantrekkelijk maakt. Als self-hosting de keuze is, is Payload de
  betere.
- **WordPress (headless)** — geen enkel voordeel hier, wel een tweede systeem om
  te onderhouden en beveiligen.

## Prijzen — alle combinaties

Normaal tarief €85/uur, vriendenkorting 40%, dus **±€50/uur**. Eindbedragen
afgerond op €50.

### Eenmalig — wat u betaalt

| Paginasoorten | Zonder CMS | **Met CMS** | Meerprijs CMS |
|---|---|---|---|
| **1** — alles op één pagina | €1.200 | **€1.700** | +€500 |
| **2** | €1.500 | **€2.000** | +€500 |
| **3** | €1.750 | **€2.400** | +€650 |
| **4** | €2.000 | **€2.650** | +€650 |

Twee keuzes, twee bedragen. Elke extra paginasoort kost €250 tot €300; het CMS
kost €500 bij één of twee paginasoorten en €650 vanaf drie, omdat er dan meer
contenttypes en meer plekken zijn waar content moet landen.

### Hoe die bedragen zijn opgebouwd

| Paginasoorten | Zonder CMS | Met CMS |
|---|---|---|
| **1** | 24 uur | 34 uur |
| **2** | 29 uur | 39 uur |
| **3** | 34 uur | 47 uur |
| **4** | 40 uur | 53 uur |

De site zelf gaat tegen €85 per uur met 40% vriendenkorting; het CMS is een vast
bedrag van €500 (10 uur) of €650 (13 uur) in plaats van een urenberekening —
dat is eenvoudiger en pakt voor u niet ongunstiger uit.

Uren × €85 normaal tarief, daar 40% vriendenkorting vanaf, afgerond op €50.
Voorbeeld: 1 paginasoort met Sanity is 35 uur × €85 = €2.975, min €1.175
korting, is €1.800.

Het CMS wordt met elke extra paginasoort iets duurder: meer contenttypes, meer
velden, meer plekken waar content moet landen.

**De korting geldt op al het ontwikkelwerk** — de bouw zelf én eventueel
meerwerk, dat tegen €50/uur gaat in plaats van €85/uur. De maandprijs staat los
en gaat tegen normaal tarief; dat is geen korting maar ook geen opslag, het zit
marktconform in de band van €30–120 per maand.

Het kortingspercentage schommelt door de afronding per variant tussen 39% en
42%; de genoemde euro's zijn leidend. De bureau-referentie van €2.000–3.000
uit de marktcontext hieronder betreft één paginasoort zonder CMS — met meer
pagina's en CMS-werk loopt dat op tot €4.000–6.000.

## Marktcontext (Nederland, 2026)

- Een one-pager kost commercieel **€400–1.500**; professioneel custom werk zit aan de bovenkant of erboven. Deze site is volledig custom (eigen branding, animaties, geen template) — bij een bureau zou dit eerder **€2.000–3.000** zijn.
- Onderhoudscontracten voor kleine sites: **€30–120 per maand**, afhankelijk van de scope.
- Mijn normale zzp-tarief is **€85/uur** (markttarief zzp: €75–95/uur, agency: €110–140/uur). Voor dit project reken ik **±€50/uur**.

## Maandelijkse kosten

De maandprijs bestaat uit twee delen: **onderhoud** (mijn werk) en **hosting**
(de rekening van het platform waar de site draait). Die splitsen we, zodat u
ziet waarvoor u betaalt.

| Per maand | Zonder CMS | Met CMS |
|---|---|---|
| Onderhoud & support | €49 | €35 |
| Hosting *(indicatief)* | ±€20 | ±€20 |
| **Totaal** | **±€69** | **±€55** |

> **De hostingpost staat nog niet vast.** We kijken samen welk platform het
> beste past. Op een lichter platform valt die €20 grotendeels of helemaal weg,
> en dan zakt het maandbedrag mee — het onderhoudsdeel blijft in beide gevallen
> hetzelfde. Ik reken hosting door tegen kostprijs; daar zit geen opslag op.

Met Payload wordt het onderhoudsdeel €65 in plaats van €35, vanwege
database-onderhoud, back-ups en migraties.

**Wat er in het onderhoud zit:**

| | Zonder CMS | Met CMS |
|---|---|---|
| Updates & security (dependencies, monitoring) | ✔ | ✔ |
| Beschikbaarheid in de gaten houden | ✔ | ✔ |
| Bereikbaar zijn als er iets is | ✔ | ✔ |
| Bugs in opgeleverd werk | kosteloos | kosteloos |
| Kleine contentwijzigingen | 1 uur/maand via mij | u doet het zelf |

De domeinnaam valt hierbuiten — die registreert u zelf (±€20 per jaar).

De maandprijs is gelijk ongeacht het aantal paginasoorten.

### Hosting en domein — wat kost dat nou echt?

De maandprijs is één bedrag, maar er zitten drie verschillende dingen in die
vaak door elkaar lopen:

1. **Hosting en domein** — echte rekeningen van derden
2. **De CMS-dienst zelf** — bij alle vier de opties €0
3. **Mijn tijd** — updates, security, monitoring, bereikbaarheid

**De hostingkosten hangen af van het platform**, en dat is een keuze die nog
openstaat:

| Per maand | Vercel Pro | Cloudflare Pages | Nederlandse VPS |
|---|---|---|---|
| Hostingplatform | €19 ($20) | €0 | €5–15 |
| Domeinnaam (±€20/jaar) | €1,70 | €1,70 | €1,70 |
| CMS-dienst (alle vier de opties) | €0 | €0 | €0 |
| Database & mediaopslag (alleen Payload) | ±€1 | ±€1 | inbegrepen |
| **Rekeningen van derden** | **±€21** | **±€2** | **±€7–17** |

**Waarom niet de gratis Vercel-tier?** Vercel's Hobby-plan sluit commercieel
gebruik uit en rekent *"een betaalde ontwikkelaar bouwt het"* daar al onder —
ook als de site zelf niets verkoopt. Een opdracht als deze valt daar altijd
onder, hoe klein de site ook is. Vercel Pro kost $20 per maand.

**Cloudflare Pages staat commercieel gebruik wél toe op de gratis tier**, met
onbeperkte bandbreedte. Dat scheelt €19 per maand. Het kost eenmalig wat extra
werk om Next.js daar goed op te krijgen, en enkele Vercel-gemakken vervallen.
Voor een site als deze is het een reële optie.

Eén nuance: Vercel Pro rekent **per ontwikkelaarsplek, niet per site**. Draait
er later meer werk van mij op hetzelfde abonnement, dan zakt het aandeel voor
deze site vanzelf.

### En een Nederlandse hostingpartij?

Op papier goedkoper — een VPS bij TransIP of Hostnet kost €5–15 per maand — maar
er zit een belangrijk verschil in wat je krijgt.

**Standaard Nederlandse webhosting werkt niet voor deze site.** Die pakketten
zijn gebouwd voor PHP/WordPress; Next.js heeft een Node.js-omgeving nodig.
Vimexx ondersteunt geen Node.js, en bij de meeste budgetpakketten geldt
hetzelfde. Wat overblijft is een **VPS** — een kale server die ik zelf inricht
en bijhoud: besturingssysteem, beveiligingsupdates, SSL-certificaten,
Node-versies, deploy-pijplijn, back-ups en monitoring.

Dat verplaatst kosten van de rekening naar mijn uren. Eén uur systeembeheer per
maand kost €50 — meer dan de €19 die de VPS uitspaart. Bovendien vervallen
zaken die nu vanzelf gaan: automatische beeldoptimalisatie, edge-caching,
voorbeeldversies per wijziging en terugrollen met één klik. Die zitten in de
beloofde snelheid en die zou ik opnieuw moeten bouwen.

**Waar een Nederlandse partij wél de beste keuze is: de domeinnaam.** Registratie
bij een Nederlandse registrar is simpel, in euro's, met Nederlandse facturatie en
support. Dat doen we sowieso.

**Wanneer een VPS alsnog logisch wordt:** zodra er meerdere klantsites op
dezelfde server draaien. Dan deelt die €10 per maand zich net zo goed als een
Vercel-abonnement, en verdient het inrichtingswerk zichzelf terug. Voor één site
is het een slechte ruil.

### De domeinnaam — die koopt u zelf

Mijn advies: registreer de domeinnaam zelf, op naam van Pass De Aux, bij een
Nederlandse registrar. Kost ±€20 per jaar en duurt vijf minuten.

Waarom niet via mij: dan is het domein onmiskenbaar van u. Stoppen we ooit met
samenwerken, dan hoeft daar geen gesprek over te komen — u houdt gewoon uw naam
en neemt 'm mee. Dat is voor u veiliger en voor mij eenvoudiger.

Ik heb alleen toegang nodig tot de DNS-instellingen om de naam naar de site te
wijzen. De domeinkosten vallen dus **buiten** de maandprijs.

**Wat er van de maandprijs overblijft voor onderhoud:**

| | Geen CMS €49 | Keystatic €35 | Sanity €35 | Payload €65 |
|---|---|---|---|---|
| Op Vercel Pro | €28 | €14 | €14 | €44 |
| Op Cloudflare | €47 | €33 | €33 | €63 |

Dat bedrag dekt updates, beveiliging, monitoring en bereikbaarheid — en zonder
CMS daarnaast een uur contentwijzigingen per maand.

De domeinnaam zit **niet** in de maandprijs — die registreert u zelf, zie
hieronder.

### Bugs zijn mijn rekening, niet die van de klant

Werkt iets niet zoals afgesproken, dan repareer ik dat kosteloos — **en het gaat
niet van het uur contentwijzigingen af.** Dat uur is er voor nieuwe wensen, niet
om fouten van mij mee te betalen. Dit geldt ook zonder SLA: opgeleverd werk hoort
te werken.

Waar de grens ligt:

| | Voorbeeld | Wie betaalt |
|---|---|---|
| **Bug** — het doet niet wat is afgesproken | Menu klapt niet open op iPhone; playlist-embed laadt niet; tekst valt over de knop heen; site is traag terwijl pagespeed beloofd was | Ik, kosteloos |
| **Wijziging** — het doet wat is afgesproken, maar je wilt iets anders | "Kan die sectie hogerop?"; een gast toevoegen; andere kleur; extra link | 1 uur/maand SLA, daarna €50/uur |
| **Onderhoud** — buiten ons beide om stukgegaan | Spotify verandert z'n embed; een dependency-update breekt iets; browserwijziging | SLA |

Bij twijfel: als jij het zonder blozen aan iemand anders zou kunnen laten zien
als "zo is 'ie bedoeld", is het een wijziging. Zo niet, dan is het een bug.

**De logica achter de SLA-prijzen:** zonder CMS loopt elke tekstwijziging via
mij — daar zit een uur werk per maand in. Mét CMS beheert de klant de content
zelf en dekt de SLA vooral hosting, updates en beschikbaarheid. Payload is per
maand juist **duurder**, ondanks dat de klant zelf beheert: er staat een
database onder die backups, monitoring en schema-migraties nodig heeft, en
Payload-majorversies vragen echt upgradewerk. Die uren verdwijnen niet omdat de
klant kan inloggen.

### Samengevat

| | Eenmalig | Per maand |
|---|---|---|
| 1 paginasoort, geen CMS | €1.200 | ±€69 |
| 1 paginasoort, met CMS | €1.700 | ±€55 |
| 4 paginasoorten, geen CMS | €2.000 | ±€69 |
| 4 paginasoorten, met CMS | €2.650 | ±€55 |

De maandbedragen zijn inclusief de indicatieve hostingpost van €20. Valt die
lager uit, dan zakt het maandbedrag mee — met CMS bijvoorbeeld naar €35.

Het maandcontract is **maandelijks opzegbaar**; u zit nergens aan vast.

### Infrastructuur bij Payload (niet in bovenstaande bedragen)

- **Neon Postgres** — de gratis tier (0,5 GB opslag, 100 compute-uren/maand,
  commercieel gebruik toegestaan) volstaat ruimschoots voor deze site. Betaalde
  plannen zijn verbruiksgebaseerd zonder maandelijks minimum, dus dit blijft
  vermoedelijk €0.
- **Vercel Blob of S3** voor geüploade media — kleine bedragen, maar niet nul.
- **Vercel Pro (±€18/maand)** wordt hier lastiger te vermijden: de admin draait
  server-side, waardoor er structureel meer compute loopt dan bij een
  grotendeels statische site met gehost CMS.

Bij Keystatic en Sanity is de infrastructuur €0 — Keystatic omdat de content
gewoon in de repo staat, Sanity omdat de gratis tier voor deze omvang niet in
de buurt van z'n limieten komt.

### Hoe ik kies

**Meestal Sanity.** Inloggen met een Google-account, wijzigingen zijn direct
zichtbaar, en het beeldbeheer — uploaden, bijsnijden, automatisch optimaliseren
— is het beste van de drie. Voor een site die op foto's leunt telt dat zwaar.
Bovendien staat de beheeromgeving los van de site: een storing daar legt de site
nooit plat.

**Keystatic als u technisch onderlegd bent** en een GitHub-account geen bezwaar
vindt. De content staat dan als bestanden in de code, zonder enige externe
partij. Nadeel: inloggen gaat via GitHub, en na opslaan duurt het één à twee
minuten voor de wijziging live staat.

**Payload valt buiten deze prijs.** Dat is een zwaarder systeem met een eigen
database eronder, zinvol zodra er gebruikersaccounts, een ledengedeelte of een
webshop bij komen. Reken dan op **€950 tot €1.200 meerprijs** in plaats van €500
of €650, en €65 per maand in plaats van €35. Voor teksten, links en een
gastenlijst is het overgedimensioneerd — u betaalt dan voor een fundering onder
een gebouw dat er niet komt.

Wat u kiest verandert niets aan de maandprijs: bij Sanity en Keystatic is die
€35, en de infrastructuur kost bij beide €0.

## Afspraken & betaling

**Geen aanbetaling.** Betaling volledig achteraf — er wordt niets vooruit
gevraagd. Wat wél vooraf vastligt is *wat* er gebouwd wordt; dat is de enige
afspraak die dit werkbaar houdt.

### Betaling

- **Factuur bij livegang**, betaaltermijn 30 dagen.
- **Vangnet:** staat de site technisch klaar maar wacht livegang op de klant
  (content, foto's, domein, akkoord), dan gaat de factuur 30 dagen na "technisch
  gereed" alsnog de deur uit. Het werk is dan gedaan; de vertraging ligt niet
  bij mij.
- **SLA** start op de dag van livegang en loopt per maand, maandelijks opzegbaar.
- Wordt het project onderweg gestaakt, dan worden de gemaakte uren gefactureerd
  tegen €50/uur — niet het volledige bedrag.

### Wat de prijs omvat

- De gekozen omvang en CMS-variant, met de secties zoals in *De site* beschreven
- **Twee revisierondes op het design** (na de eerste oplevering, en na de
  verwerking daarvan)
- **Eén revisieronde op de teksten** — redactie van wat de klant aanlevert
- SEO/GEO/pagespeed zoals hierboven, technische oplevering en livegang
- **Bugs herstellen, kosteloos en onbeperkt** — ook als er geen SLA wordt
  afgenomen. Wat niet werkt zoals afgesproken, repareer ik op eigen kosten
  (zie *Bugs zijn mijn rekening* hierboven)

### Wat meerwerk is (€50/uur, altijd vooraf afgestemd)

- Extra pagina's of secties die niet in de afgesproken opzet stonden — **een
  paginasoort die er tijdens de bouw bij komt, is een nieuwe opgave, geen
  meerwerk**
- Revisierondes voorbij de bovenstaande, of een koerswijziging in de richting
  nadat het design akkoord was
- Teksten schrijven in plaats van redigeren
- Fotografie, videobewerking, logo- of huisstijlwerk
- Functionaliteit die niet besproken is (webshop, ticketing, ledengedeelte,
  nieuwsbriefkoppeling)

Meerwerk is geen straf en geen verrassing: het gaat er alleen in als het vooraf
benoemd en akkoord is. De regel bestaat om te voorkomen dat "kan dit er nog
even bij" vijf keer gebeurt zonder dat iemand het merkt.

### Later alsnog uitbreiden

Beide keuzes zijn omkeerbaar, maar niet gratis:

- **CMS later toevoegen** kost hetzelfde als nu — de meerprijs uit de tabel. Er
  gaat niets verloren door te wachten.
- **Een paginasoort er later bij** kost meer dan het verschil in de tabel:
  reken op ±25% extra, omdat de bestaande pagina opgeknipt en heringericht moet
  worden. Van 1 naar 4 achteraf is ±€1.000 tegen €800 direct. Als u vermoedt dat
  er meer pagina's komen, is meteen zo bouwen goedkoper.

### Aanlevering door de klant

Nodig om te kunnen bouwen: teksten, logo in vector, beeldmateriaal met
gebruiksrechten, socialslinks, en toegang tot het domein. **Deadline voor
aanlevering wordt in de meeting afgesproken.** Komt het later, dan schuift de
opleverdatum mee — dat is geen boete, maar het moet wel gezegd zijn.

## Kanttekeningen

- De urenschattingen gelden bij 5–7 secties per paginasoort. Loopt de scope daar
  duidelijk overheen, dan volgt een bijgestelde opgave vóór de bouw begint —
  niet achteraf.
- Vercel Pro ($20/maand per ontwikkelaarsplek) zit in de maandprijs verwerkt — zie *Wat die maandprijs precies dekt*. De gratis Hobby-tier is geen optie voor betaald werk.
- Domeinregistratie (±€20/jaar) valt buiten deze opgave: die koopt u zelf, op eigen naam.
- Sanity's gratis tier volstaat; groeit het gebruik (meerdere redacteuren, veel assets), dan kan een betaald Sanity-plan nodig worden ($15/gebruiker/maand).

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
