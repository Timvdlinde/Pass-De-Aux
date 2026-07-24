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
