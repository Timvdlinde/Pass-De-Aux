import Image from "next/image";
import AuxCable from "./components/AuxCable";
import { getSiteContent } from "../sanity/lib/getSiteContent";
import { spotifyEmbedUrl } from "../sanity/lib/content";

function TickerGroep({ gasten }: { gasten: string[] }) {
  return (
    <div className="ticker-groep">
      {gasten.map((naam) => (
        <span key={naam}>{naam}</span>
      ))}
    </div>
  );
}

export default async function Home() {
  const { stats, gasten, radio, links } = await getSiteContent();

  return (
    <div className="site">
      <AuxCable />

      <div className="content">
        <header className="hero">
          <div className="hero-top">
            <span className="badge">
              <Image src="/logo.png" alt="" width={28} height={28} />
              Pass De Aux
            </span>
            <nav className="hero-nav mono" aria-label="Secties">
              <a href="#podcast">Podcast</a>
              <a href="#playlist">Playlist</a>
              <a href="#radio">Radio</a>
            </nav>
          </div>

          <div className="hero-main">
            <div className="hero-tekst">
            <h1 className="wordmark">
              <span className="rij">Pass</span>
              <span className="rij rij-aux">
                <span className="de-blok">de</span>
                Aux
                <span className="jack-dot" aria-hidden="true" />
              </span>
            </h1>

            <p className="lede">
              Het platform voor <strong>Nederlandse hiphop</strong>. Elke week
              geven wij de aux door aan de beste artiesten van het land — in de
              podcast, op de playlist en live op de radio.
            </p>

            <div className="cta-row">
              <a className="knop knop-vol" href={links.podcast}>
                Luister de podcast
              </a>
              <a className="knop knop-lijn" href={links.playlist}>
                Volg de playlist
              </a>
            </div>

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
            </div>
            <div className="hero-logo">
              <Image
                src="/logo.png"
                alt="Pass De Aux logo: een speakerbox"
                width={360}
                height={360}
                priority
              />
            </div>
          </div>
        </header>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-baan">
            <TickerGroep gasten={gasten} />
            <TickerGroep gasten={gasten} />
          </div>
        </div>

        <section id="podcast" className="panel">
          <div className="panel-kop">
            <h2>De podcast</h2>
            <span className="mono">{stats.afleveringMoment}</span>
          </div>
          <div className="panel-grid">
            <div className="panel-tekst">
              <p>
                Elke zondag schuift een artiest aan voor een{" "}
                <strong>eerlijk gesprek</strong> over carrière, nieuwe muziek en
                de lessen onderweg. Geen promopraatje, maar het verhaal achter
                de nummers.
              </p>
              <p>
                Van gevestigde namen tot de nieuwe lichting: wie iets betekent
                in de Nederlandse hiphop, komt hier aan de aux.
              </p>
              <a className="tekst-link" href={links.youtube}>
                Kijk op YouTube →
              </a>
              <div className="gasten">
                <p className="gasten-label mono">Aan de aux geweest</p>
                <ul className="gasten-lijst">
                  {gasten.map((naam) => (
                    <li key={naam}>{naam}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="embed-kaart">
              <iframe
                src={spotifyEmbedUrl(links.podcast)}
                height="352"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title="Pass De Aux Podcast op Spotify"
              />
            </div>
          </div>
        </section>

        <section id="playlist" className="panel">
          <div className="panel-kop">
            <h2>De playlist</h2>
            <span className="mono">{stats.playlistVolgers} volgers</span>
          </div>
          <div className="panel-grid">
            <div className="panel-tekst">
              <p>
                Dé plek waar nieuwe Nederlandse hiphop{" "}
                <strong>als eerste doorkomt</strong>. Meer dan honderdtienduizend
                volgers ontdekken hier wekelijks de tracks die overal gaan
                draaien.
              </p>
              <p>
                Wekelijks ververst, scherp samengesteld. Sta je erop, dan weet
                je dat het goed zit.
              </p>
              <a className="tekst-link" href={links.playlist}>
                Volg op Spotify →
              </a>
            </div>
            <div className="embed-kaart">
              <iframe
                src={spotifyEmbedUrl(links.playlist)}
                height="500"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title="Pass De Aux playlist op Spotify"
              />
            </div>
          </div>
        </section>

        <section id="radio" className="panel">
          <div className="panel-kop">
            <h2>Op de radio</h2>
            <span className="mono">GLXY.RADIO</span>
          </div>
          <div className="radio-kaart">
            <span className="live-chip">
              <span className="live-dot" aria-hidden="true" />
              Live
            </span>
            <p className="radio-tijd">
              {radio.dag} <em>{radio.tijd}</em>
              <br />
              op GLXY.RADIO
            </p>
            <p className="radio-tekst">
              Twee uur hiphop, r&b en de verhalen erachter — live vanuit de
              studio in Utrecht, online en via DAB+.
            </p>
            <a className="tekst-link" href={links.glxy}>
              Luister live →
            </a>
          </div>
        </section>

        <footer className="einde">
          <div className="einde-binnen">
            <span className="aux-in">Aux in</span>
            <h2>
              Geef &rsquo;m<br />
              door.
            </h2>
            <ul className="sociale-lijst">
              <li>
                <a href={links.instagram}>Instagram</a>
              </li>
              <li>
                <a href={links.tiktok}>TikTok</a>
              </li>
              <li>
                <a href={links.youtube}>YouTube</a>
              </li>
              <li>
                <a href={links.podcast}>Spotify</a>
              </li>
            </ul>
            <div className="kleine-print mono">
              <span>© 2026 Pass De Aux</span>
              <span>
                Powered by <a href={links.ambassade}>Ambassade</a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
