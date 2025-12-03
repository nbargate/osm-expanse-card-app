const DEFAULT_OSM_AUTH_BASE_URL = 'https://www.onlinescoutmanager.co.uk/oauth/authorize';

const baseAuthorizationUrl = process.env.OSM_AUTH_BASE_URL ?? DEFAULT_OSM_AUTH_BASE_URL;
const scopes = process.env.OSM_SCOPES ?? 'finance-section-read';

export function getAuthorizationUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.OSM_CLIENT_ID ?? '',
    redirect_uri: process.env.OSM_REDIRECT_URI ?? '',
    response_type: 'code',
    scope: scopes,
  });

  const url = new URL(baseAuthorizationUrl);
  url.search = params.toString();

  return url.toString();
}

export async function exchangeCodeForTokens(code: string): Promise<any> {
  return {
    access_token: 'dummy',
    refresh_token: 'dummy',
    code,
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<any> {
  return {
    access_token: 'dummy-refreshed',
    refresh_token: refreshToken,
  };
}
