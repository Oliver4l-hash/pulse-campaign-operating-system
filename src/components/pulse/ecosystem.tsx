/** Modules orbiting around the Pulse Core */
export function EcosystemOrbit() {
  const modules = [
    "Campaign Management","Volunteers","Permissions","Manifesto","Policy Library",
    "Calendar","Tasks","Communications","Polling","Community","Issues",
    "Project Tracking","Analytics","Geo Mapping","Zoning","QR Distribution",
    "Media Library","Events","Documents","Knowledge","Feedback","Transition","Governance",
  ];
  const rings = [
    { r: 130, items: modules.slice(0, 7), speed: 80 },
    { r: 200, items: modules.slice(7, 16), speed: 130 },
    { r: 270, items: modules.slice(16), speed: 180 },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[640px]">
      <div className="absolute inset-0 grid place-items-center">
        {/* Concentric guide rings */}
        {[130, 200, 270].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-hairline"
            style={{ width: r * 2, height: r * 2 }}
          />
        ))}
        {/* Core */}
        <div className="relative grid place-items-center w-28 h-28 rounded-full bg-navy text-canvas shadow-[0_20px_60px_-20px_rgba(20,30,60,0.6)]">
          <span className="absolute inset-0 rounded-full border border-civic/40 animate-ping opacity-40" />
          <div className="font-display text-2xl font-light">pulse</div>
          <div className="font-mono text-[9px] tracking-[0.18em] opacity-70">CORE</div>
        </div>
        {/* Orbits */}
        {rings.map((ring, ri) => (
          <div
            key={ri}
            className="absolute"
            style={{
              width: ring.r * 2, height: ring.r * 2,
              animation: `orbit-rotate ${ring.speed}s linear infinite`,
              animationDirection: ri % 2 ? "reverse" : "normal",
            }}
          >
            {ring.items.map((m, i) => {
              const angle = (i / ring.items.length) * Math.PI * 2;
              const x = Math.cos(angle) * ring.r;
              const y = Math.sin(angle) * ring.r;
              return (
                <div
                  key={m}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                >
                  <div
                    className="rounded-full border border-hairline bg-card text-navy px-3 py-1.5 text-[11px] font-mono tracking-tight whitespace-nowrap shadow-sm"
                    style={{ animation: `orbit-rotate ${ring.speed}s linear infinite`, animationDirection: ri % 2 ? "normal" : "reverse" }}
                  >
                    {m}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
