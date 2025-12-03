import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';

const AUTH_URL = 'https://www.onlinescoutmanager.co.uk/oauth/authorize';
const TOKEN_URL = 'https://www.onlinescoutmanager.co.uk/oauth/token';
const RESOURCE_URL = 'https://www.onlinescoutmanager.co.uk/oauth/resource';

const CLIENT_ID = process.env.OSM_CLIENT_ID!;
const CLIENT_SECRET = process.env.OSM_CLIENT_SECRET!;
const REDIRECT_URI = process.env.OSM_REDIRECT_URI!;
const SCOPES = process.env.OSM_SCOPES ?? 'finance-section-read';

type RawOAuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number; // seconds
  token_type: string;
};

export type StoredTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // ms since epoch
};

const TOKENS_FILE = path.join(process.cwd(), 'data', 'osm-tokens.json');

async function ensureDataDir() {
  const dir = path.dirname(TOKENS_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // ignore
  }
}

async function loadTokensFromDisk(): Promise<StoredTokens | null> {
  try {
    const raw = await fs.readFile(TOKENS_FILE, 'utf8');
    return JSON.parse(raw) as StoredTokens;
  } catch {
    return null;
  }
}

async function saveTokensToDisk(tokens: StoredTokens): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TOKENS_FILE, JSON.stringify(tokens, null, 2), 'utf8');
}

export function getAuthorizationUrl(): string {
  const url = new URL(AUTH_URL);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('redirect_uri', REDIRECT_URI);
  url.searchParams.set('scope', SCOPES);
  // you could add state here if you want CSRF protection later
  return url.toString();
}

async function exchangeCodeForRawTokens(code: string): Promise<RawOAuthResponse> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('OSM token exchange failed', res.status, text);
    throw new Error(`OSM token exchange failed with status ${res.status}`);
  }

  const json = (await res.json()) as RawOAuthResponse;
  return json;
}

async function refreshRawTokens(refreshToken: string): Promise<RawOAuthResponse> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('OSM token refresh failed', res.status, text);
    throw new Error(`OSM token refresh failed with status ${res.status}`);
  }

  const json = (await res.json()) as RawOAuthResponse;
  return json;
}

function mapRawToStored(raw: RawOAuthResponse): StoredTokens {
  const now = Date.now();
  const expiresAt = now + (raw.expires_in - 60) * 1000; // refresh 60s early
  return {
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
    expiresAt,
  };
}

export async function handleOAuthCallback(code: string): Promise<void> {
  const raw = await exchangeCodeForRawTokens(code);
  const stored = mapRawToStored(raw);
  await saveTokensToDisk(stored);
}

export async function getValidAccessToken(): Promise<string> {
  let tokens = await loadTokensFromDisk();
  if (!tokens) {
    throw new Error('No OSM tokens stored. Please connect to OSM again.');
  }

  const now = Date.now();
  if (tokens.expiresAt <= now) {
    // refresh
    const raw = await refreshRawTokens(tokens.refreshToken);
    tokens = mapRawToStored(raw);
    await saveTokensToDisk(tokens);
  }

  return tokens.accessToken;
}

// Optional helper to fetch the /oauth/resource endpoint
export async function fetchResourceOwner(accessToken: string): Promise<any> {
  const res = await fetch(RESOURCE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('OSM resource call failed', res.status, text);
    throw new Error(`OSM resource call failed with status ${res.status}`);
  }
  return res.json();
}
