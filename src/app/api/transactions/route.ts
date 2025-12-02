import { NextResponse } from 'next/server';
import { fetchTransactionsFromOSM } from '@/lib/osmClient';

export async function GET() {
  const transactions = await fetchTransactionsFromOSM();
  return NextResponse.json(transactions);
}
