import Image from "next/image";
import AuxCable from "./components/AuxCable";

const LINKS = {
  instagram: "https://www.instagram.com/pass.de.aux/",
  tiktok: "https://www.tiktok.com/@pass.de.aux",
  youtube: "https://www.youtube.com/@PASSDEAUX",
  podcast: "https://open.spotify.com/show/0oX4c3DeilewS7spH9Fyfl",
  playlist: "https://open.spotify.com/playlist/4QZ4F2Yxc6RLx7ybP0Ozn4",
  glxy: "https://glxy.radio/shows/pass-de-aux/",
  ambassade: "https://ambassade.nl",
};

const GASTEN = [
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
];

function TickerGroep() {
  return (
    <div className="ticker-groep">
      {GASTEN.map((naam) => (
        <span key={naam}>{naam}</span>
      ))}
    </div>
  );
}

export default function Home() {
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
              <a className="knop knop-vol" href={LINKS.podcast}>
                Luister de podcast
              </a>
              <a className="knop knop-lijn" href={LINKS.playlist}>
                Volg de playlist
              </a>
            </div>

            <ul className="stats mono">
              <li>
                <strong>110K+</strong> playlist-volgers
              </li>
              <li>
                <strong>46K</strong> op Instagram
              </li>
              <li>
                <strong>142+</strong> afleveringen
              </li>
              <li>
                <strong>Zondag 15:00</strong> nieuwe aflevering
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
            <TickerGroep />
            <TickerGroep />
          </div>
        </div>

        <section id="podcast" className="panel">
          <div className="panel-kop">
            <h2>De podcast</h2>
            <span className="mono">Elke zondag — 15:00</span>
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
              <a className="tekst-link" href={LINKS.youtube}>
                Kijk op YouTube →
              </a>
              <div className="gasten">
                <p className="gasten-label mono">Aan de aux geweest</p>
                <ul className="gasten-lijst">
                  {GASTEN.map((naam) => (
                    <li key={naam}>{naam}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="embed-kaart">
              <iframe
                src="https://open.spotify.com/embed/show/0oX4c3DeilewS7spH9Fyfl?theme=0"
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
            <span className="mono">110K+ volgers</span>
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
              <a className="tekst-link" href={LINKS.playlist}>
                Volg op Spotify →
              </a>
            </div>
            <div className="embed-kaart">
              <iframe
                src="https://open.spotify.com/embed/playlist/4QZ4F2Yxc6RLx7ybP0Ozn4?theme=0"
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
              Maandag <em>19:00 – 21:00</em>
              <br />
              op GLXY.RADIO
            </p>
            <p className="radio-tekst">
              Twee uur hiphop, r&b en de verhalen erachter — live vanuit de
              studio in Utrecht, online en via DAB+.
            </p>
            <a className="tekst-link" href={LINKS.glxy}>
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
                <a href={LINKS.instagram}>Instagram</a>
              </li>
              <li>
                <a href={LINKS.tiktok}>TikTok</a>
              </li>
              <li>
                <a href={LINKS.youtube}>YouTube</a>
              </li>
              <li>
                <a href={LINKS.podcast}>Spotify</a>
              </li>
            </ul>
            <div className="kleine-print mono">
              <span>© 2026 Pass De Aux</span>
              <span>
                Powered by <a href={LINKS.ambassade}>Ambassade</a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
