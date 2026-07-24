import { client } from "./client";
import { SITE_CONTENT_QUERY } from "./queries";
import {
  DEFAULT_CONTENT,
  mergeSiteContent,
  type SiteContent,
} from "./content";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const data = await client.fetch(
      SITE_CONTENT_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
    return mergeSiteContent(data);
  } catch (err) {
    console.error("Sanity-fetch mislukt, defaults gebruikt:", err);
    return DEFAULT_CONTENT;
  }
}
