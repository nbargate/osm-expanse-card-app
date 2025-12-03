import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const clientId = process.env.OSM_CLIENT_ID;
  const redirectUri = process.env.OSM_REDIRECT_URI;
  const baseUrl = process.env.OSM_BASE_URL;
  const scope = process.env.OSM_SCOPE;

  const allKeys = Object.keys(process.env).sort();

  return NextResponse.json({
    OSM_CLIENT_ID: clientId ? clientId.slice(0, 6) + "...(redacted)" : null,
    OSM_REDIRECT_URI: redirectUri ?? null,
    OSM_BASE_URL: baseUrl ?? null,
    OSM_SCOPE: scope ?? null,
    hasClientId: !!clientId,
    hasRedirectUri: !!redirectUri,
    osmEnvKeysPresent: allKeys.filter((k) => k.startsWith("OSM_")),
    allEnvKeys: allKeys, // keys only, no values
  });
}
