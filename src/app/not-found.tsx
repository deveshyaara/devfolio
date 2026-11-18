import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 text-[#0A0A0A]"
      style={{ backgroundColor: '#ECECEC' }}
    >
      <div className="max-w-lg w-full bg-white border border-black/10 stoik-chamfer-lg p-8 sm:p-10 space-y-5">
        <div className="inline-flex items-center gap-2.5">
          <span className="stoik-rot-square" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0052FF]">
            404 · Route Not Found
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] m-0">
          This page does not exist.
        </h1>
        <p className="text-sm leading-relaxed text-black/65 m-0">
          The requested URL could not be found on Devesh Tiwari&apos;s portfolio. Use the
          navigation below to return to the homepage or view the online resume.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/"
            className="stoik-chamfer-sm inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] text-white text-xs font-medium hover:bg-[#0052FF] transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/resume"
            className="stoik-chamfer-sm inline-flex items-center gap-2 px-4 py-2.5 border border-black/15 text-[#0A0A0A] text-xs font-medium hover:border-[#0052FF] hover:text-[#0052FF] transition-colors"
          >
            View Resume →
          </Link>
        </div>
      </div>
    </main>
  );
}
