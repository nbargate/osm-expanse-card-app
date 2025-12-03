import { NextRequest, NextResponse } from 'next/server';
import { handleOAuthCallback } from '@/lib/osmAuth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Missing code parameter from OSM' },
      { status: 400 }
    );
  }

  try {
    await handleOAuthCallback(code);
    // Redirect back to the homepage after successful connection
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    console.error('Error handling OSM OAuth callback', err);
    return NextResponse.json(
      { error: 'Failed to complete OSM OAuth flow' },
      { status: 500 }
    );
  }
}
