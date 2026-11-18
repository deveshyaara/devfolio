export default function Loading() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: '#ECECEC' }}
      role="status"
      aria-label="Loading page"
    >
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-black/60">
        <span className="stoik-rot-square" aria-hidden="true" />
        <span>Loading</span>
      </div>
    </div>
  );
}
