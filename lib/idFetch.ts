/* lib/idFetch.ts */
export interface WebsiteResponse {
  data: { _id: string };
}

/**
 * Fetches the tenant website’s _id by UID (currently hard‑wired to PRJ00003).
 * Throw on HTTP errors so callers can catch.
 */
export async function idFetch(): Promise<string> {
  const uid = "PRJ00003";
  const url = `https://api.multiwebbuilder.technolitics.com/api/v1/multi-tenant-web-builder/website/auth/get-website-by-uid/${uid}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Website request failed (${res.status})`);

  const json: WebsiteResponse = await res.json();
  return json.data._id;
}
