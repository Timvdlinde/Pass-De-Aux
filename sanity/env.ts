function assertValue(v: string | undefined, errorMessage: string): string {
  if (v === undefined || v === "") {
    throw new Error(errorMessage);
  }
  return v;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Ontbrekende env-var: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Ontbrekende env-var: NEXT_PUBLIC_SANITY_DATASET"
);

export const apiVersion = "2026-07-01";
