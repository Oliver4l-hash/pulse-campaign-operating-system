import { PulseLogo } from "./logo";

/** A stylized Mission Control UI preview built in pure SVG/HTML — no images. */
export function MissionControlPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-hairline bg-card shadow-[0_30px_80px_-30px_rgba(20,30,60,0.25)] ${compact ? "" : "ring-1 ring-navy/5"}`}>
      {/* Top chrome */}
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3 bg-canvas-warm/60">
        <div className="flex items-center gap-3 text-navy">
          <PulseLogo />
          <span className="text-[11px] text-graphite font-mono uppercase tracking-[0.18em]">Mission Control</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-graphite">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-civic animate-ping opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-civic" />
          </span>
          <span>Live · 18:42 EAT</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-px bg-hairline">
        {/* Sidebar */}
        <aside className="col-span-3 hidden md:flex flex-col bg-canvas-warm/40 p-4 gap-1.5 text-[12px] text-graphite">
          {[
            ["◐", "Overview", true],
            ["◇", "Strategy"],
            ["◈", "Operations"],
            ["◉", "Community"],
            ["⬡", "Communications"],
            ["⬢", "Field Teams"],
            ["◌", "Polling"],
            ["▣", "Projects"],
            ["▤", "Mapping"],
            ["▦", "Analytics"],
          ].map(([icon, label, active]) => (
            <div
              key={String(label)}
              className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 ${active ? "bg-navy text-canvas" : "hover:bg-canvas"}`}
            >
              <span className="opacity-70">{icon as string}</span>
              <span>{label as string}</span>
            </div>
          ))}
          <div className="mt-auto pt-4 border-t border-hairline">
            <div className="text-[10px] uppercase tracking-[0.18em] text-graphite mb-2">Pulse Score</div>
            <div className="flex items-end gap-2">
              <span className="font-display text-4xl font-light text-navy">87</span>
              <span className="text-[11px] text-civic mb-1.5">+4.2 wk</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-9 bg-card p-5 md:p-6 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline rounded-xl overflow-hidden border border-hairline">
            {[
              ["Active Supporters", "256,890", "+12.5%"],
              ["Volunteers Live", "4,128", "+318"],
              ["Wards Covered", "147 / 200", "73%"],
              ["Open Decisions", "9", "2 urgent"],
            ].map(([k, v, d]) => (
              <div key={k} className="bg-card p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-graphite">{k}</div>
                <div className="mt-2 font-display text-2xl font-light text-navy">{v}</div>
                <div className="text-[11px] text-civic mt-1">{d}</div>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-5 gap-4">
            {/* Health rings */}
            <div className="md:col-span-2 rounded-xl border border-hairline p-4">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-graphite">Operational Health</div>
                <div className="text-[11px] text-graphite">Today</div>
              </div>
              <div className="flex items-center justify-center py-2">
                <HealthRings />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-[11px]">
                {[
                  ["Field", "94%", "bg-civic"],
                  ["Comms", "81%", "bg-navy"],
                  ["Data", "76%", "bg-graphite/70"],
                ].map(([l, v, c]) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
                    <span className="text-graphite">{l}</span>
                    <span className="ml-auto text-navy">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision queue */}
            <div className="md:col-span-3 rounded-xl border border-hairline p-4">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-graphite">Executive Decision Queue</div>
                <div className="text-[11px] text-graphite">9 open</div>
              </div>
              <ul className="divide-y divide-hairline -mx-1">
                {[
                  ["Approve manifesto chapter 04 — Water", "Policy", "Now"],
                  ["Reroute field team Kasarani → Embakasi", "Ops", "12m"],
                  ["Approve WhatsApp broadcast — 45,678", "Comms", "1h"],
                  ["Sign-off Q3 ward coverage plan", "Strategy", "3h"],
                ].map(([title, tag, when]) => (
                  <li key={title} className="flex items-center gap-3 px-1 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-civic" />
                    <span className="text-[13px] text-ink flex-1 truncate">{title}</span>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-graphite border border-hairline rounded-full px-2 py-0.5">{tag}</span>
                    <span className="text-[11px] text-graphite w-10 text-right">{when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-hairline p-4">
            <div className="flex items-baseline justify-between mb-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-graphite">Campaign Timeline</div>
              <div className="text-[11px] text-graphite">T–142 days to election</div>
            </div>
            <div className="relative h-16">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-hairline" />
              <div className="absolute left-0 top-1/2 h-px bg-navy" style={{ width: "62%" }} />
              {[
                ["Launch", 4, true],
                ["Org build", 18, true],
                ["Manifesto", 34, true],
                ["Ground game", 52, true],
                ["Polling sweep", 62, false],
                ["GOTV", 82, false],
                ["E-Day", 96, false],
              ].map(([label, pos, done], i) => (
                <div key={i} className="absolute -translate-x-1/2 top-1/2" style={{ left: `${pos as number}%` }}>
                  <div className={`h-2.5 w-2.5 rounded-full -translate-y-1/2 ${done ? "bg-navy" : "bg-canvas border border-navy"}`} />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 mt-1 text-[10px] whitespace-nowrap text-graphite">{label as string}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function HealthRings() {
  const rings = [
    { r: 42, p: 0.94, color: "oklch(0.62 0.16 152)" },
    { r: 32, p: 0.81, color: "oklch(0.22 0.07 256)" },
    { r: 22, p: 0.76, color: "oklch(0.5 0.012 260)" },
  ];
  return (
    <svg viewBox="0 0 120 120" className="h-36 w-36">
      {rings.map((r, i) => {
        const c = 2 * Math.PI * r.r;
        return (
          <g key={i} transform="rotate(-90 60 60)">
            <circle cx="60" cy="60" r={r.r} fill="none" stroke="oklch(0.9 0.012 80)" strokeWidth="6" />
            <circle
              cx="60" cy="60" r={r.r} fill="none" stroke={r.color} strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${c * r.p} ${c}`}
            />
          </g>
        );
      })}
      <text x="60" y="58" textAnchor="middle" className="fill-navy" style={{ font: "300 18px Fraunces, serif" }}>87</text>
      <text x="60" y="74" textAnchor="middle" className="fill-graphite" style={{ font: "500 8px JetBrains Mono, monospace", letterSpacing: "0.18em" }}>PULSE</text>
    </svg>
  );
}
