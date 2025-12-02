const baseAuthorizationUrl = '';

export function getAuthorizationUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.OSM_CLIENT_ID ?? '',
    redirect_uri: process.env.OSM_REDIRECT_URI ?? '',
    response_type: 'code',
    scope: 'read_prefs write_api',
  });

  return `${baseAuthorizationUrl}?${params.toString()}`;
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
