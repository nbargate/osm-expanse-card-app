import Link from 'next/link';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  status: 'approved' | 'pending' | 'declined';
  createdAt: string;
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${getBaseUrl()}/api/transactions`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return res.json();
}

export default async function Home() {
  const transactions = await getTransactions();
  const totalApproved = transactions
    .filter((txn) => txn.status === 'approved')
    .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <Link
          href="/api/osm-auth/start"
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Connect to OSM
        </Link>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-900/20">
          <p className="text-sm uppercase tracking-wide text-indigo-200">Total Approved</p>
          <p className="mt-2 text-3xl font-bold text-white">
            ${totalApproved.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-1 text-sm text-slate-300">Across {transactions.length} recent transactions</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-900/20">
          <p className="text-sm uppercase tracking-wide text-indigo-200">Pending</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {transactions.filter((txn) => txn.status === 'pending').length}
          </p>
          <p className="mt-1 text-sm text-slate-300">Awaiting review</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-900/20">
          <p className="text-sm uppercase tracking-wide text-indigo-200">Declined</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {transactions.filter((txn) => txn.status === 'declined').length}
          </p>
          <p className="mt-1 text-sm text-slate-300">Requires follow up</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-indigo-900/20">
        <div className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-indigo-200">Transactions</p>
              <p className="text-xl font-semibold text-white">Recent activity</p>
            </div>
            <Link
              className="rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-50 ring-1 ring-indigo-400/70 transition hover:bg-indigo-500/30 hover:text-white"
              href="/api/transactions"
            >
              View API
            </Link>
          </div>
        </div>
        <div className="divide-y divide-white/10">
          {transactions.map((txn) => (
            <div key={txn.id} className="grid grid-cols-2 items-center gap-4 px-6 py-4 sm:grid-cols-5">
              <div className="col-span-2 flex flex-col gap-1">
                <p className="text-base font-semibold text-white">{txn.merchant}</p>
                <p className="text-xs uppercase tracking-wide text-slate-300">{new Date(txn.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-lg font-semibold text-white">${txn.amount.toFixed(2)}</div>
              <div className="text-sm text-slate-200">{txn.currency}</div>
              <span
                className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${
                  txn.status === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-100 ring-emerald-400/60'
                    : txn.status === 'pending'
                      ? 'bg-amber-500/15 text-amber-100 ring-amber-300/60'
                      : 'bg-rose-500/15 text-rose-100 ring-rose-400/60'
                }`}
              >
                {txn.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
