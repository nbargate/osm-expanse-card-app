import { NextResponse } from "next/server";
import {
  OSM_BASE_URL,
  OSM_CLIENT_ID,
  OSM_REDIRECT_URI,
  OSM_SCOPE,
} from "../../../../../lib/osm/config";

export const runtime = "nodejs";

export async function GET() {
  const allKeys = Object.keys(process.env).sort();

  return NextResponse.json({
    OSM_CLIENT_ID: OSM_CLIENT_ID
      ? OSM_CLIENT_ID.slice(0, 6) + "...(redacted)"
      : null,
    OSM_REDIRECT_URI: OSM_REDIRECT_URI ?? null,
    OSM_BASE_URL: OSM_BASE_URL ?? null,
    OSM_SCOPE: OSM_SCOPE ?? null,
    hasClientId: !!OSM_CLIENT_ID,
    hasRedirectUri: !!OSM_REDIRECT_URI,
    osmEnvKeysPresent: allKeys.filter((k) => k.startsWith("OSM_")),
    allEnvKeys: allKeys, // keys only, no values
  });
}
