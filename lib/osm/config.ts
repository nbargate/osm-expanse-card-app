import {
  LOCAL_OSM_CLIENT_ID,
  LOCAL_OSM_CLIENT_SECRET,
} from "./localSecrets";

export const OSM_BASE_URL =
  "https://www.onlinescoutmanager.co.uk";

// The redirect URI is fixed for this app.
export const OSM_REDIRECT_URI =
  "https://osm.tbproductions.co.uk/api/osm-auth/callback";

export const OSM_SCOPE = "finance-section-read";

// Primary source of truth: localSecrets.ts
export const OSM_CLIENT_ID = LOCAL_OSM_CLIENT_ID;
export const OSM_CLIENT_SECRET = LOCAL_OSM_CLIENT_SECRET;
