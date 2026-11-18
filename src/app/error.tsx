'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error boundary caught:', error);
  }, [error]);

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 text-[#0A0A0A]"
      style={{ backgroundColor: '#ECECEC' }}
    >
      <div className="max-w-lg w-full bg-white border border-black/10 stoik-chamfer-lg p-8 sm:p-10 space-y-5">
        <div className="inline-flex items-center gap-2.5">
          <span className="stoik-rot-square" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0052FF]">
            Runtime Recovery
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] m-0">
          Something went wrong.
        </h1>
        <p className="text-sm leading-relaxed text-black/65 m-0">
          An unexpected error interrupted rendering. You can retry safely or return to the
          homepage.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="stoik-chamfer-sm inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] text-white text-xs font-medium hover:bg-[#0052FF] transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="stoik-chamfer-sm inline-flex items-center gap-2 px-4 py-2.5 border border-black/15 text-[#0A0A0A] text-xs font-medium hover:border-[#0052FF] hover:text-[#0052FF] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
