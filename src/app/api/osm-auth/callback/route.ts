import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/osmAuth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ success: false, error: 'Missing code' }, { status: 400 });
  }

  const tokens = await exchangeCodeForTokens(code);
  console.log('OSM tokens:', tokens);

  return NextResponse.json({ success: true });
}
