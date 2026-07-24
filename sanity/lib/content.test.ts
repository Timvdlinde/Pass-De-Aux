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
