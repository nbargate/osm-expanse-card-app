import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const clientId = process.env.OSM_CLIENT_ID;
  const redirectUri = process.env.OSM_REDIRECT_URI;
  const baseUrl = process.env.OSM_BASE_URL;
  const scope = process.env.OSM_SCOPE;

  return NextResponse.json({
    OSM_CLIENT_ID: clientId ? clientId.slice(0, 6) + "...(redacted)" : null,
    OSM_REDIRECT_URI: redirectUri ?? null,
    OSM_BASE_URL: baseUrl ?? null,
    OSM_SCOPE: scope ?? null,
    hasClientId: !!clientId,
    hasRedirectUri: !!redirectUri,
    osmEnvKeysPresent: Object.keys(process.env).filter((k) =>
      k.startsWith("OSM_")
    ),
  });
}
