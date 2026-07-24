"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "pass-de-aux",
  title: "Pass De Aux",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site-instellingen")
              .id("siteInstellingen")
              .child(
                S.document()
                  .schemaType("siteInstellingen")
                  .documentId("siteInstellingen")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) => item.templateId !== "siteInstellingen"
      ),
  },
});
