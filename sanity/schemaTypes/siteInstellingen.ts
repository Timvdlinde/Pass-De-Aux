import { defineField, defineType } from "sanity";

export const siteInstellingen = defineType({
  name: "siteInstellingen",
  title: "Site-instellingen",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "Statistieken",
      type: "object",
      fields: [
        defineField({ name: "playlistVolgers", title: "Playlist-volgers", type: "string", description: "Bijv. 110K+" }),
        defineField({ name: "instagramVolgers", title: "Instagram-volgers", type: "string", description: "Bijv. 46K" }),
        defineField({ name: "aantalAfleveringen", title: "Aantal afleveringen", type: "string", description: "Bijv. 142+" }),
        defineField({ name: "afleveringMoment", title: "Moment nieuwe aflevering", type: "string", description: "Bijv. Zondag 15:00" }),
      ],
    }),
    defineField({
      name: "gasten",
      title: "Gasten (aan de aux geweest)",
      type: "array",
      of: [{ type: "string" }],
      description: "Sleep om de volgorde te wijzigen; deze lijst voedt de ticker én de gastenlijst.",
    }),
    defineField({
      name: "radio",
      title: "Radio-uitzending",
      type: "object",
      fields: [
        defineField({ name: "dag", title: "Dag", type: "string", description: "Bijv. Maandag" }),
        defineField({ name: "tijd", title: "Tijdvak", type: "string", description: "Bijv. 19:00 – 21:00" }),
      ],
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "podcast", title: "Spotify-podcast", type: "url" }),
        defineField({ name: "playlist", title: "Spotify-playlist", type: "url" }),
        defineField({ name: "glxy", title: "GLXY Radio", type: "url" }),
        defineField({ name: "ambassade", title: "Ambassade", type: "url" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site-instellingen" }),
  },
});
