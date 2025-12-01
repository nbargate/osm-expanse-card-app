import { NextResponse } from 'next/server';

type TransactionStatus = 'approved' | 'pending' | 'declined';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: string;
}

const transactions: Transaction[] = [
  {
    id: 'txn_001',
    merchant: 'Aurora Outfitters',
    amount: 182.4,
    currency: 'USD',
    status: 'approved',
    createdAt: '2025-11-28T10:23:00Z'
  },
  {
    id: 'txn_002',
    merchant: 'Zephyr Airlines',
    amount: 642.15,
    currency: 'USD',
    status: 'pending',
    createdAt: '2025-11-29T08:10:00Z'
  },
  {
    id: 'txn_003',
    merchant: 'Northwind Grocers',
    amount: 73.21,
    currency: 'USD',
    status: 'approved',
    createdAt: '2025-11-29T14:52:00Z'
  },
  {
    id: 'txn_004',
    merchant: 'Summit Fuel',
    amount: 124.99,
    currency: 'USD',
    status: 'declined',
    createdAt: '2025-11-30T02:40:00Z'
  },
  {
    id: 'txn_005',
    merchant: 'Harbor Lodging',
    amount: 312.0,
    currency: 'USD',
    status: 'approved',
    createdAt: '2025-11-30T18:05:00Z'
  }
];

export async function GET() {
  return NextResponse.json(transactions);
}
