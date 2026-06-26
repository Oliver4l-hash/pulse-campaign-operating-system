export function PulseLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[1.35rem] tracking-tight ${className}`}
      aria-label="Pulse"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      </svg>
      <span className="font-light">pulse</span>
    </span>
  );
}
