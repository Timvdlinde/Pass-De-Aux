# Prijsopgave — Pass De Aux website (bevestigd)

*Opgesteld: 6 augustus 2026, na de intake · Alle bedragen ex. btw ·
Ontwikkeling met 40% vriendenkorting*

Dit stuk legt vast wat er in de meeting van 6 augustus gekozen is. De volledige
toelichting — waarom een paginasoort kost wat 'ie kost, welke CMS'en zijn
afgewogen, hoe de hostingkosten zijn opgebouwd — staat in
[`docs/prijsopgave-pass-de-aux.md`](../prijsopgave-pass-de-aux.md). Dat stuk
blijft geldig; hieronder staat alleen nog de gekozen variant.

## Wat we hebben afgesproken

| | |
|---|---|
| **Omvang** | 3 paginasoorten — twee vast, derde nog te bevestigen |
| **CMS** | Ja — welk systeem wordt nog bepaald |
| **Eenmalig** | **€2.400** bij drie · **€2.000** bij twee |
| **Onderhoud** | **€40/maand**, optioneel — vanaf livegang, maandelijks opzegbaar |
| **Hosting & domein** | Rechtstreeks door Pass De Aux betaald, buiten mijn factuur |
| **Live** | Q4 2026, rond de kerst |
| **Materiaal** | Z.s.m. aanleveren — Jur |
| **Contactpersoon** | Jur |

> ⚠️ **De €2.400 gaat uit van drie paginasoorten. Er liggen er twee vast: Home
> en Merken.** De derde is in de meeting niet benoemd. Ik doe hieronder een
> voorstel — het archief — maar zolang dat niet bevestigd is, is dit een opgave
> voor twee paginasoorten en dan wordt het **€2.000**.

## De site

Brandingsite voor Pass De Aux, het platform voor Nederlandse hiphop. Aux Media ×
Pass De Aux.

**Voor wie:** fans · merken & bookers · upcoming artiesten.

**Menu:** Home — Merken — Contact.

- Volledig custom design in eigen branding (cyaan/navy uit het speakerbox-logo,
  wordmark in logostijl)
- Aux-kabel signature-animatie (custom SVG-component)
- Gebouwd met Next.js (App Router), responsive, gedeployed op Vercel
- Geen template — volledig custom design- en developmentwerk

**Inbegrepen, geen meerprijs:** SEO (metadata, Open Graph, sitemap,
gestructureerde data), GEO (vindbaarheid in AI-antwoorden), pagespeed (Core Web
Vitals in het groen).

### Paginasoort 1 — Home

Uit de intake: *hoe hoger op de site, hoe belangrijker je bent.* Die volgorde is
leidend bij het ontwerp. Wat er in ieder geval op komt:

1. **Dikke header** — de eerste indruk, met de signature-animatie
2. **Actueel / relevant** — wat er nu speelt
3. **Podcast**
4. **Playlist**
5. **Radio / GLXY**
6. **Proof of work** — het tofste portfoliowerk, met de doorstap naar *Merken*
7. **Media**
8. **Drop je demo**
9. **Contact** — blok onderaan, geen eigen pagina

Plus een link-knop naar **Aux Media** — zie hieronder.

De homepage is ook de hub uit jullie briefing: *"één plek waar iedere bezoeker
door kan naar onze kanalen, in 1 of 2 klikken bij onze media."* Dat is een
ontwerpeis, geen sectie — het bepaalt hoe elk blok eindigt.

De wekelijkse ritmiek is het onderdeel dat het vaakst ververst en dus in het CMS
komt. Dat zijn er vier, niet drie: podcast (zondag), live radio (maandag),
freestyles (woensdag) en playlist (vrijdag). *Ralph Op Reportage* en
festivalinterviews lopen op aanvraag.

### Paginasoort 2 — Merken

De pitch richting bookers en bedrijven, bereikbaar vanuit het menu én vanaf het
proof-of-work-blok op de homepage. Aparte pagina omdat je 'm los moet kunnen
doorsturen en 'm apart vindbaar wilt hebben.

**De inhoud ligt er al.** Het information deck (`PDA - CIJFERS EN PRIJZEN.pdf`)
is in feite deze pagina in PDF-vorm: bereikcijfers, kijkersprofiel, de zes
formats, eerdere samenwerkingen en de volledige tarieflijst. Ik heb dat
uitgewerkt in [`merken-pagina-content.md`](merken-pagina-content.md).

**De tarieven gaan er niet op** — besloten. De pagina overtuigt op bereik,
publiek en bewijs, en stuurt door naar het formulier. Prijzen blijven waar ze
horen: in het gesprek. Dat past ook bij jullie eigen voorwaarde dat offertes
dertig dagen geldig zijn.

Twee dingen die daar nog uit volgen:

1. **De partnersectie wordt een verzendend formulier.** Dat stond niet in de
   opgave — een formulier is functionaliteit, geen tekstblok. **Ik neem het
   erbij zonder meerprijs**, zolang het één formulier is dat naar een mailadres
   verstuurt. Wordt het een aanvraagflow met pakketkeuze en budgetvelden, dan is
   dat een apart gesprek.
2. **De bereikcijfers moeten in het CMS**, niet in de code. Ze verouderen elk
   kwartaal, en het deck spreekt zichzelf al tegen op twee meetmomenten.

Ook uit het deck: er zijn **zes formats**, niet drie. *Ralph Op Reportage* en
*festivalinterviews* staan nog nergens in de opzet.

### Paginasoort 3 — voorstel: het archief

In de meeting stond dit nog open, maar de informatie die daarna binnenkwam wijst
één kant op. Uit `Pass-De-Aux_informatie.docx`:

> *"een soort archief/tentoonstelling van alle soorten media die we maken +
> randzaken er omheen"*

Dat is een eigen paginasoort, en het is de enige kandidaat die op alle drie de
toetsvragen "ja" scoort:

| | Archief |
|---|---|
| Wil je dit los kunnen doorsturen? | Ja — per aflevering, per format |
| Moet dit apart in Google gevonden worden? | Ja — dit is waar de losse vindbaarheid vandaan komt |
| Groeit dit elke maand aan? | Ja — vier formats leveren wekelijks aan |

**Wat erin komt:** alle zes de formats, doorzoekbaar en filterbaar — podcast,
GLXY Radio Freestyles, Live Radio, festivalinterviews, Ralph Op Reportage en de
Spotify-playlist. Dat is ook het onderdeel waar de hubfunctie uit de docx landt:
in één of twee klikken van de site naar het kanaal waar je het bekijkt of
beluistert.

Bevestig dit en de €2.400 staat vast. Kiezen jullie er alsnog voor het bij twee
paginasoorten te houden, dan wordt het €2.000 — maar dan moeten de zes formats
allemaal op de homepage passen, en dat wordt krap.

## Aux Media — dat is een tweede website, en die zit hier niet in

Dit staat niet in de meeting-notities maar wel in de aangeleverde informatie, en
het is te groot om onbenoemd te laten:

> *"Idealiter hebben we 2 websites: Pass De Aux, en Aux Media. Deze zijn
> verbonden door een link-knop, maar zijn wel 2 losstaande dingen."*

Dat is precies goed gezien — Aux Media is een mediaproductiebedrijf dat podcasts
maakt voor bedrijven, met een andere doelgroep en een ander verhaal. Dat hoort
niet op deze site.

**Wat er wél in de €2.400 zit:** de link-knop naar Aux Media, op zijn plek in het
ontwerp. Dat is een knop, dat is klein, dat is inbegrepen.

**Wat er niet in zit:** de site erachter. Dat is een eigen project met een eigen
opgave — eigen paginasoorten, eigen ontwerp, eigen teksten. Ik noem dit nu zodat
het geen "kan dit er nog even bij" wordt: dan is het namelijk allebei half.

Zeg het als jullie er een indicatie voor willen; met een one-pager erbij is de
opzet snel te schetsen. Maar het is een gesprek náást dit project, niet erin.

## Het CMS

Jullie beheren de content zelf: teksten, links, de gastenlijst, en de wekelijkse
podcast-, radio- en playlistitems.

**Welk systeem het wordt, ligt nog niet vast.** Dat is ook niet iets waar jullie
een keuze in hoeven te maken — die maak ik, op basis van hoe jullie ermee gaan
werken. **De €650 verandert er niet door:** dat bedrag geldt voor beide opties
die hier realistisch zijn.

| | Inloggen met | Wijziging live na | Beeldbeheer |
|---|---|---|---|
| **Sanity** | Google-account | direct | uploaden, bijsnijden, automatisch optimaliseren |
| **Keystatic** | GitHub-account | 1 à 2 minuten (deploy) | basaal, bestanden in de repo |

Waar het op neerkomt: Sanity is makkelijker voor wie niet in code werkt en heeft
duidelijk het beste beeldbeheer — wat telt voor een site die op foto's en
episode-artwork leunt. Keystatic zet de content voorgoed in de repo, zonder
enige externe partij, maar vraagt een GitHub-account en een minuut geduld na
elke wijziging. Beide kosten €0 aan licenties.

Ik laat jullie de keuze zien voordat ik 'm maak, maar hij verandert niets aan de
prijs en niets aan de planning.

**Payload valt hierbuiten.** Dat is een zwaarder systeem met een eigen database,
zinvol zodra er accounts, een ledengedeelte of een webshop bij komen. Reken dan
op €950–1.200 in plaats van €650, en een hogere maandprijs. Voor teksten, links
en een gastenlijst is het overgedimensioneerd.

## De prijs

### Eenmalig — €2.400

| | |
|---|---|
| 3 paginasoorten, bouw & design | €1.750 |
| CMS | €650 |
| **Totaal eenmalig** | **€2.400** |

**Hoe dat bedrag is opgebouwd:** 34 uur voor drie paginasoorten plus 13 uur voor
het CMS is 47 uur. 47 × €85 normaal tarief = €3.995, min 40% vriendenkorting =
€2.397, afgerond op €50 → **€2.400**.

Het CMS-deel is een vast bedrag (€650) in plaats van een urenberekening — dat is
eenvoudiger en pakt voor jullie niet ongunstiger uit.

De korting van 40% geldt op **al het ontwikkelwerk**: de bouw zelf én eventueel
meerwerk, dat tegen €50/uur gaat in plaats van €85/uur.

### Per maand — €40 onderhoud, optioneel

| Per maand | | Wie factureert |
|---|---|---|
| Onderhoud & support | €40 | ik |
| Hosting | kostprijs | het platform, rechtstreeks aan jullie |
| Domeinnaam (±€20/jaar) | ±€1,70 | de registrar, rechtstreeks aan jullie |

**Hosting en domein betalen jullie zelf, rechtstreeks.** Die staan op jullie
naam en op jullie rekening; er komt geen doorbelasting via mij, dus ook geen
opslag. Dat is voor jullie het goedkoopst en het is transparant: wat het
platform kost, kost het.

Wat ik daarvoor nodig heb is toegang, geen eigendom — een account bij het
hostingplatform waar ik bij kan, en toegang tot de DNS-instellingen om het
domein naar de site te wijzen.

**Het onderhoudscontract is optioneel** en start pas op de dag van livegang.
Nemen jullie het niet af, dan blijft de site gewoon draaien en herstel ik bugs
in opgeleverd werk nog steeds kosteloos — je mist dan de updates, de monitoring
en de bereikbaarheid.

**Wat er in het onderhoud zit:** updates en security (dependencies, monitoring),
in de gaten houden dat de site draait, bereikbaar zijn als er iets is, en bugs
in opgeleverd werk kosteloos herstellen. Contentwijzigingen doen jullie zelf via
het CMS — dat is precies waarom er geen uur wijzigingen in de maandprijs zit.

Het contract is **maandelijks opzegbaar** en het aantal paginasoorten verandert
er niets aan. Livegang staat op Q4, dus in 2026 loopt er hooguit één maand.

**De domeinnaam:** registreer 'm zelf, op naam van Pass De Aux, bij een
Nederlandse registrar (TransIP, Hostnet), ±€20 per jaar. Dan is 'ie van jullie,
wat er ook gebeurt. Doe dat snel — zolang de naam vrij rondloopt kan iemand
anders 'm pakken.

## Afspraken

Doorgenomen en akkoord in de meeting:

- **Geen aanbetaling.** Factuur bij livegang, betaaltermijn 30 dagen
- **Vangnet:** staat de site technisch klaar maar wacht livegang op jullie
  (content, foto's, domein, akkoord), dan gaat de factuur 30 dagen na "technisch
  gereed" alsnog de deur uit
- **Twee ontwerprondes** — design/wireframes en daarna oppoetsen
- **Eén tekstronde** — redactie van wat jullie aanleveren
- **Bugs herstel ik kosteloos**, ook zonder onderhoudscontract, en het gaat niet
  van iets anders af
- **SEO, AI-vindbaarheid en snelheid** zitten in de prijs
- **Domein op naam van Pass De Aux**
- **Maandelijks opzegbaar.** Stoppen jullie ermee, dan blijft de site van jullie
  en draag ik 'm over
- Wordt het project onderweg gestaakt, dan factureer ik de gemaakte uren tegen
  €50/uur — niet het volledige bedrag

### Wat meerwerk is (€50/uur, altijd vooraf afgestemd)

- Secties die niet in de afgesproken opzet stonden
- **Een vierde paginasoort die er tijdens de bouw bij komt is een nieuwe opgave,
  geen meerwerk** — reken op ±€250 tot €300 als het vóór de bouw wordt besloten,
  en ±25% meer als de bestaande pagina's er al staan en opgeknipt moeten worden
- Ontwerprondes voorbij de twee, of een koerswijziging nadat het design akkoord
  was
- Teksten schrijven in plaats van redigeren
- Fotografie, videobewerking, logo- of huisstijlwerk
- Functionaliteit die niet besproken is — webshop, ticketing, ledengedeelte,
  nieuwsbriefkoppeling. Komt daar iets van, dan is een zwaarder systeem nodig
  (Payload) en volgt daarvoor een aparte opgave

## Planning

| | |
|---|---|
| **Oplevering 1 — wireframe homepage** | Uiterlijk donderdag 13 augustus 2026 |
| **Materiaal bij mij** | Z.s.m. — Jur |
| **Live vóór** | Q4 2026 — rond de kerst |

### Oplevering 1 — wireframe homepage

Uiterlijk donderdag. Dit is de indeling, niet het uiterlijk: welke blokken er
staan, in welke volgorde, en hoeveel ruimte ze krijgen. Kleur en typografie
komen in ronde twee — die kunnen ook niet eerder, want de kleurrichting moet nog
komen.

**Twee varianten, allebei even belangrijk:**

| | Voor wie | Waarom het telt |
|---|---|---|
| **Mobiel** | Fans | Daar komt het volume vandaan |
| **Desktop** | Merken & bookers | Daar wordt de beslissing genomen |

Dat is geen "mobile first en desktop erachteraan". Het zijn twee verschillende
bezoekers met twee verschillende doelen op dezelfde pagina, dus de wireframe
moet in beide breedtes op zichzelf kloppen. Waar dat wringt — het proof-of-work
blok met de doorstap naar Merken is de plek waar het gaat schuren — kies ik per
breedte een eigen oplossing in plaats van één compromis.

De volgorde uit de intake blijft leidend: hoe hoger op de pagina, hoe
belangrijker.

### Daarna

De livedatum hangt aan een moment; dat maakt de aanleverdatum het kritieke punt.
Komt het materiaal later, dan schuift de oplevering mee — dat is geen boete,
maar het moet gezegd zijn.

**Materiaal dat al klaarligt:** logo in vector, foto's van jullie, studiofoto's,
episode-artwork, huisstijl-fonts, kleuren, rechten geregeld.

**Al binnen:** het information deck met alle Merken-content, de "wie is Pass De
Aux"-tekst, en vijf ontwerpreferenties (noahsark.nl, vigilante.group,
researchdesignagency.com, pamidordesign.com, justus-john.com).

**Nog nodig van jullie:** het besluit over openbare tarieven, de kleurkeuze op
basis van die referenties, de socialslinks (Instagram, TikTok, YouTube, Spotify
podcast + playlist, GLXY Radio, Ambassade, Aux Media), en toegang tot de DNS
zodra het domein er is.

## Open punten

Dit staat nog niet vast en heeft een antwoord nodig voor de bouw begint:

| Punt | Status | Consequentie |
|---|---|---|
| **Derde paginasoort** | Voorstel: het archief | Bevestigen, dan staat €2.400 vast |
| **Aux Media-site** | Aparte opgave, nog niet gemaakt | Link-knop zit in de prijs, de site niet |
| **Kleurrichting** | Vijf referenties binnen, keuze nog te maken | Blokkeert ontwerpronde 2; de wireframe kan door |
| **Domeinnaam** | Nog niet geregistreerd | Snel doen — anders pakt iemand anders 'm |
| **Registrar** | Nog te kiezen | TransIP of Hostnet |
| **Hostingplatform** | Nog te kiezen | Jullie rekening; Cloudflare Pages is gratis, Vercel Pro ±€19/maand |
| **Welk CMS** | Nog te bepalen — ik kies | Geen prijsgevolg: €650 bij zowel Sanity als Keystatic |
| **Onderhoudscontract** | Optioneel, nog geen besluit | €40/maand vanaf livegang |
| **Volgend contactmoment** | Nog niet ingepland | — |
| **Wie schrijft de teksten** | Nog niet afgesproken | Schrijven is meerwerk, redigeren zit in de prijs |
| **Bezoekersstatistieken** | Niet gewenst | Los project, indien later toch |

---

*Tarief €85/uur · vriendenprijs €50/uur · alle bedragen ex. btw*
