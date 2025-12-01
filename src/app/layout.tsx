import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OSM Expanse Card Reporting App',
  description: 'Dashboard starter for reporting on Expanse card transactions'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-900/30 backdrop-blur">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">OSM</p>
              <h1 className="text-2xl font-semibold text-white">Expanse Card Reporting</h1>
            </div>
            <div className="rounded-full bg-indigo-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-100 ring-1 ring-indigo-300/50">
              Next.js + TailwindCSS
            </div>
          </header>
          <main>{children}</main>
          <footer className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300 shadow-lg shadow-indigo-900/20">
            <span>Built with Next.js 14, TypeScript, and TailwindCSS.</span>
            <a
              href="https://nextjs.org/docs"
              className="text-indigo-200 underline decoration-indigo-400/60 decoration-2 underline-offset-4 transition hover:text-indigo-100 hover:decoration-indigo-200"
              rel="noreferrer"
              target="_blank"
            >
              Next.js Docs
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
