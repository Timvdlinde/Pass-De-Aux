import { defineQuery } from "next-sanity";

export const SITE_CONTENT_QUERY = defineQuery(
  `*[_id == "siteInstellingen"][0]{ stats, gasten, radio, links }`
);
