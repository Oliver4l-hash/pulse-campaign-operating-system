import { useEffect, useRef, useState } from "react";

type Hotspot = { x: number; y: number; label: string; tip: string };
type Chapter = {
  n: string; label: string; title: string; body: string;
  stage: React.ReactNode; hotspots: Hotspot[];
};

/** A vertical scroll storytelling section with a sticky stage on the right
 * and chapter cards on the left. Each chapter shows a different mini-preview
 * with clickable "Try it" annotations + an auto-play guided tour. */
export function CampaignWalkthrough() {
  const chapters: Chapter[] = [
    {
      n: "01", label: "Strategy",
      title: "A campaign begins as a hypothesis.",
      body: "Leadership defines theory of change, target wards, milestones, and the coordinators accountable for each. Pulse holds the plan — and watches it move.",
      stage: <StagePlan />,
      hotspots: [
        { x: 18, y: 22, label: "Theory of change", tip: "Define your campaign hypothesis — the story you're testing in the world." },
        { x: 78, y: 22, label: "Milestone bar", tip: "Each milestone tracks against the days-to-election countdown." },
        { x: 22, y: 70, label: "Plan timeline", tip: "Status moves automatically as work completes in other workspaces." },
      ],
    },
    {
      n: "02", label: "Organization",
      title: "Volunteers become a structured movement.",
      body: "Roles, regions, and permissions are assigned. New volunteers onboard themselves through a QR. Every action flows back to the org chart.",
      stage: <StageOrg />,
      hotspots: [
        { x: 50, y: 22, label: "Campaign Manager", tip: "The org root. Every action eventually rolls up here for accountability." },
        { x: 26, y: 45, label: "Comms team", tip: "Owns press, WhatsApp blasts, and narrative discipline." },
        { x: 73, y: 45, label: "Data team", tip: "Polling, maps, and intelligence dashboards live here." },
      ],
    },
    {
      n: "03", label: "Manifesto",
      title: "Policy becomes a living document.",
      body: "The manifesto is composed from a versioned library. Each chapter ties to projects, communities, and the wards that asked for it.",
      stage: <StageManifesto />,
      hotspots: [
        { x: 78, y: 38, label: "Drafted %", tip: "Each chapter has its own draft, review and approval workflow." },
        { x: 20, y: 38, label: "Chapter number", tip: "Reorder chapters by dragging — numbering recomputes everywhere it appears." },
      ],
    },
    {
      n: "04", label: "Community",
      title: "Supporters are organized, not collected.",
      body: "People are clustered by geography and interest. Conversations stay contextual. The relationship outlives the cycle.",
      stage: <StageCommunity />,
      hotspots: [
        { x: 26, y: 22, label: "Ward count", tip: "Communities are scoped by geography so coordinators see their own people." },
        { x: 76, y: 22, label: "Weekly growth", tip: "Pulse highlights wards growing — and the ones that suddenly aren't." },
        { x: 30, y: 78, label: "Live themes", tip: "Recurring conversation topics surface here and feed straight into Polling." },
      ],
    },
    {
      n: "05", label: "Operations",
      title: "Field coordination at the speed of the day.",
      body: "Events, canvassing routes, and ward assignments coordinate through one operational timeline. Status is observed, not requested.",
      stage: <StageOps />,
      hotspots: [
        { x: 50, y: 20, label: "Live counters", tip: "Events, routes and volunteers all in one glance — refreshed in real time." },
        { x: 28, y: 70, label: "Coverage map", tip: "Tap a pin to see who's on the ground, what they're doing, and what's next." },
        { x: 78, y: 70, label: "Hotspot pin", tip: "Pulse flags zones that need attention — low coverage, incidents, or surges." },
      ],
    },
    {
      n: "06", label: "Polling",
      title: "Public sentiment, structured.",
      body: "Polls and consultations gather structured input. Recurring themes surface automatically and inform the next decision.",
      stage: <StagePolling />,
      hotspots: [
        { x: 50, y: 32, label: "Top issue", tip: "Issues are weighted by ward and demographic — not just raw counts." },
        { x: 50, y: 82, label: "Sample size", tip: "Every poll shows ward distribution so leadership can spot blind spots." },
      ],
    },
    {
      n: "07", label: "Election Day",
      title: "One screen. One source of truth.",
      body: "Polling stations, agents, incidents, and turnout consolidate in real time. Decisions move from instinct to evidence.",
      stage: <StageEDay />,
      hotspots: [
        { x: 26, y: 22, label: "Turnout live", tip: "Compared against the previous cycle so swings show immediately." },
        { x: 76, y: 22, label: "Stations reporting", tip: "Drilldown to the station: agent, incidents, ballot box status." },
        { x: 50, y: 75, label: "Live ticker", tip: "Every operational event lands here — and routes to the right team." },
      ],
    },
    {
      n: "08", label: "Governance",
      title: "The mandate becomes a delivery plan.",
      body: "The campaign workspace transitions into a governance workspace. Communities, projects, and promises carry over — intact.",
      stage: <StageGov />,
      hotspots: [
        { x: 27, y: 50, label: "Campaign artifacts", tip: "Manifesto chapters, communities and issues — the campaign's institutional memory." },
        { x: 73, y: 50, label: "Governance equivalents", tip: "Each artifact transitions into its delivery-side counterpart on Day 1." },
      ],
    },
  ];

  return (
    <section id="walkthrough" className="relative">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-3xl pb-16 md:pb-24">
          <div className="eyebrow mb-5">— The Lifecycle · Interactive Tour</div>
          <h2 className="display-lg text-navy">Follow a campaign through Pulse.</h2>
          <p className="lede mt-5">
            Scroll through an entire election cycle, one workspace at a time. Tap the numbered pins on each preview — or press <em className="not-italic text-civic">Take the tour</em> to let Pulse walk you through.
          </p>
        </div>

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 md:gap-16">
          <div className="space-y-[60vh] md:space-y-[55vh] pb-[35vh]">
            {chapters.map((c, i) => (
              <ChapterCard key={c.n} chapter={c} index={i} />
            ))}
          </div>
          <StickyStage chapters={chapters} />
        </div>
      </div>
    </section>
  );
}

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "-40% 0px -40% 0px",
    });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (active) {
      const ev = new CustomEvent("pulse:chapter", { detail: index });
      window.dispatchEvent(ev);
    }
  }, [active, index]);
  return (
    <div ref={ref} className="md:min-h-[40vh] flex flex-col justify-center">
      <div className={`transition-all duration-700 ${active ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"}`}>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] tracking-[0.18em] text-civic">{chapter.n}</span>
          <span className="hairline flex-1 max-w-[60px]" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-graphite uppercase">{chapter.label}</span>
        </div>
        <h3 className="display-md text-navy max-w-[20ch]">{chapter.title}</h3>
        <p className="mt-4 text-graphite max-w-prose leading-relaxed">{chapter.body}</p>
        <ul className="mt-5 space-y-1.5">
          {chapter.hotspots.map((h, i) => (
            <li key={i} className="flex items-baseline gap-3 text-[12px] text-graphite">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-civic/15 text-civic font-mono text-[10px] flex-shrink-0">{i + 1}</span>
              <span><span className="text-navy">{h.label}</span> — {h.tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StickyStage({ chapters }: { chapters: Chapter[] }) {
  const [idx, setIdx] = useState(0);
  const [openHot, setOpenHot] = useState<number | null>(null);
  const [touring, setTouring] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      setIdx((e as CustomEvent<number>).detail);
      setOpenHot(null);
    };
    window.addEventListener("pulse:chapter", handler);
    return () => window.removeEventListener("pulse:chapter", handler);
  }, []);

  // Guided tour auto-cycles through hotspots, then advances chapter.
  useEffect(() => {
    if (!touring) return;
    const hots = chapters[idx].hotspots;
    let cancelled = false;
    let i = 0;
    setOpenHot(0);
    const tick = () => {
      if (cancelled) return;
      i += 1;
      if (i >= hots.length) {
        if (idx < chapters.length - 1) {
          setIdx(idx + 1);
        } else {
          setTouring(false);
          setOpenHot(null);
        }
        return;
      }
      setOpenHot(i);
      timer = setTimeout(tick, 2200);
    };
    let timer = setTimeout(tick, 2200);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [touring, idx, chapters]);

  const current = chapters[idx];

  return (
    <div className="hidden md:block">
      <div className="sticky top-28">
        <div className="relative aspect-[4/5] rounded-2xl border border-hairline bg-card overflow-hidden shadow-[0_30px_80px_-30px_rgba(20,30,60,0.2)]">
          {chapters.map((c, i) => (
            <div
              key={c.n}
              className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              {c.stage}
            </div>
          ))}

          {/* Hotspot pins for the active chapter */}
          <div className="absolute inset-0 pointer-events-none">
            {current.hotspots.map((h, i) => {
              const open = openHot === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpenHot(open ? null : i)}
                  className="absolute pointer-events-auto group"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
                  aria-label={`Try it — ${h.label}`}
                >
                  <span className="relative flex items-center justify-center">
                    <span className={`absolute inline-flex h-7 w-7 rounded-full bg-civic/40 ${open ? "animate-ping" : "opacity-0 group-hover:opacity-60"}`} />
                    <span className={`relative inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono border transition-colors ${open ? "bg-navy text-canvas border-navy" : "bg-canvas text-navy border-navy/40 group-hover:border-navy"}`}>
                      {i + 1}
                    </span>
                  </span>
                  {open && (
                    <div
                      className="absolute z-10 w-56 p-3 rounded-lg bg-navy text-canvas shadow-[0_20px_50px_-20px_rgba(20,30,60,0.6)] text-left"
                      style={{
                        left: h.x > 60 ? "auto" : "calc(100% + 10px)",
                        right: h.x > 60 ? "calc(100% + 10px)" : "auto",
                        top: "-4px",
                      }}
                    >
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-civic-soft mb-1">Try it · {String(i + 1).padStart(2, "0")}</div>
                      <div className="font-medium text-[13px] leading-snug">{h.label}</div>
                      <div className="mt-1 text-[12px] text-canvas/75 leading-relaxed">{h.tip}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Chrome */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTouring((t) => !t)}
              className={`pointer-events-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border transition-colors ${touring ? "bg-navy text-canvas border-navy" : "bg-card text-navy border-hairline hover:border-navy/40"}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${touring ? "bg-civic-soft animate-pulse" : "bg-civic"}`} />
              {touring ? "Touring…" : "Take the tour"}
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-graphite font-mono">
            <span>{current.n} · {current.label.toUpperCase()}</span>
            <div className="flex gap-1.5">
              {chapters.map((_, i) => (
                <span key={i} className={`h-1 w-3 rounded-full transition-colors ${i === idx ? "bg-navy" : "bg-hairline"}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 text-[11px] font-mono text-graphite text-center">
          {openHot !== null ? `Showing annotation ${openHot + 1} of ${current.hotspots.length} · click pin to close` : `Click any numbered pin · ${current.hotspots.length} annotations on this view`}
        </div>
      </div>
    </div>
  );
}

/* ===== Mini-stages ===== */
function StageFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-full w-full p-6 flex flex-col gap-4 bg-canvas-warm/40">
      <div className="flex items-center justify-between text-[11px] font-mono text-graphite uppercase tracking-[0.18em]">
        <span className="text-navy">pulse</span><span>{title}</span>
      </div>
      <div className="flex-1 rounded-xl bg-card border border-hairline p-5 overflow-hidden">{children}</div>
    </div>
  );
}

function StagePlan() {
  return (
    <StageFrame title="Strategy Board">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {["Theory", "Targets", "Milestones"].map((t, i) => (
          <div key={t} className="rounded-lg border border-hairline p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-graphite">{t}</div>
            <div className="mt-2 h-1 bg-hairline rounded-full overflow-hidden">
              <div className="h-full bg-navy" style={{ width: `${[55, 70, 82][i]}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-graphite mb-2">142 days to election</div>
      <div className="space-y-2">
        {[
          ["Launch", "Done"],
          ["Org build", "Done"],
          ["Manifesto", "In review"],
          ["Ground game", "Active"],
          ["Polling sweep", "Scheduled"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-civic mr-2.5" />
            <span className="text-ink">{k}</span>
            <span className="ml-auto text-graphite">{v}</span>
          </div>
        ))}
      </div>
    </StageFrame>
  );
}

function StageOrg() {
  return (
    <StageFrame title="Org Chart">
      <svg viewBox="0 0 300 280" className="w-full h-full">
        {[
          [150,40,80,110],[150,40,150,110],[150,40,220,110],
          [80,110,40,200],[80,110,110,200],[150,110,150,200],[220,110,200,200],[220,110,260,200],
        ].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.9 0.012 80)" strokeWidth="1" />
        ))}
        {[[150,40,"Campaign Manager","CM"],[80,110,"Comms","CO"],[150,110,"Field","FD"],[220,110,"Data","DT"],
          [40,200,"WhatsApp","WA"],[110,200,"Press","PR"],[150,200,"Wards","WD"],[200,200,"Polling","PL"],[260,200,"Maps","MP"]
        ].map(([x,y,label,init],i)=>(
          <g key={i}>
            <circle cx={x as number} cy={y as number} r={i===0?22:16} fill={i===0?"oklch(0.22 0.07 256)":"#fff"} stroke="oklch(0.22 0.07 256)" />
            <text x={x as number} y={(y as number)+3} textAnchor="middle" fontSize="9" fill={i===0?"#fff":"oklch(0.22 0.07 256)"} fontFamily="JetBrains Mono">{init as string}</text>
            <text x={x as number} y={(y as number)+(i===0?40:30)} textAnchor="middle" fontSize="9" fill="oklch(0.5 0.012 260)">{label as string}</text>
          </g>
        ))}
      </svg>
    </StageFrame>
  );
}

function StageManifesto() {
  return (
    <StageFrame title="Manifesto Builder">
      <div className="font-display text-2xl font-light text-navy leading-tight mb-3">A People-First Plan for Nairobi County.</div>
      <div className="space-y-2.5">
        {[
          ["01", "Water & Sanitation", 92],
          ["02", "Health Access", 78],
          ["03", "Youth Employment", 64],
          ["04", "Roads & Mobility", 51],
          ["05", "Public Safety", 40],
        ].map(([n, t, p]) => (
          <div key={t as string} className="border border-hairline rounded-lg p-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-graphite font-mono">{n}</span>
              <span className="text-ink flex-1 ml-3">{t}</span>
              <span className="text-civic">{p}% drafted</span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-hairline overflow-hidden">
              <div className="h-full bg-civic" style={{ width: `${p}%` }} />
            </div>
          </div>
        ))}
      </div>
    </StageFrame>
  );
}

function StageCommunity() {
  return (
    <StageFrame title="Communities">
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          ["Kasarani Ward", "5,678", "+128"],
          ["Embakasi North", "4,890", "+96"],
          ["Roysambu", "4,321", "+72"],
          ["Mathare", "3,765", "+44"],
        ].map(([n, c, d]) => (
          <div key={n as string} className="border border-hairline rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-graphite">{n}</div>
            <div className="font-display text-xl font-light text-navy mt-1">{c}</div>
            <div className="text-[11px] text-civic">{d} this wk</div>
          </div>
        ))}
      </div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-graphite mb-2">Conversations</div>
      <div className="space-y-1.5 text-[12px] text-ink">
        <div className="flex"><span className="text-civic mr-2">●</span>Water access — 12 wards · 248 messages</div>
        <div className="flex"><span className="text-navy mr-2">●</span>Youth jobs — 8 wards · 162 messages</div>
        <div className="flex"><span className="text-graphite mr-2">●</span>Street lighting — 5 wards · 88 messages</div>
      </div>
    </StageFrame>
  );
}

function StageOps() {
  return (
    <StageFrame title="Field Operations">
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[["Live events","18"],["Routes","42"],["Volunteers","4,128"]].map(([k,v]) => (
          <div key={k as string} className="border border-hairline rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-graphite">{k}</div>
            <div className="font-display text-xl font-light text-navy mt-1">{v}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-canvas-warm/60 border border-hairline p-3 h-[180px] relative overflow-hidden">
        <svg viewBox="0 0 240 160" className="absolute inset-0 w-full h-full">
          {Array.from({length: 7}).map((_,i)=>(
            <path key={i} d={`M${10+i*30} 20 q15 ${10+i*5} 25 ${30+i*4} t10 ${50-i*3} z`} fill={i%3===0?"oklch(0.78 0.09 152 / 0.35)":"oklch(0.9 0.012 80)"} stroke="oklch(0.85 0.012 80)" strokeWidth="0.5" />
          ))}
          {[[50,60],[110,80],[170,50],[200,110],[80,120],[140,130]].map(([x,y],i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="oklch(0.22 0.07 256)" />
              <circle cx={x} cy={y} r="8" fill="none" stroke="oklch(0.22 0.07 256)" strokeOpacity="0.3" />
            </g>
          ))}
        </svg>
      </div>
    </StageFrame>
  );
}

function StagePolling() {
  return (
    <StageFrame title="Polls & Consultations">
      <div className="text-[11px] uppercase tracking-[0.18em] text-graphite">Which issue should we prioritize?</div>
      <div className="mt-3 space-y-3">
        {[
          ["Water & Sanitation", 45],
          ["Health", 28],
          ["Youth Employment", 17],
          ["Roads", 10],
        ].map(([k, v]) => (
          <div key={k as string}>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="text-ink">{k}</span>
              <span className="text-graphite">{v}%</span>
            </div>
            <div className="h-2 rounded-full bg-hairline overflow-hidden">
              <div className="h-full bg-navy" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-graphite">1,245 responses · 18 wards</div>
    </StageFrame>
  );
}

function StageEDay() {
  return (
    <StageFrame title="Election Day · Live">
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[["Turnout","61.4%","+2.1 vs '22"],["Stations reporting","842 / 980","86%"],["Agents on duty","1,206","99%"],["Incidents","7","2 open"]].map(([k,v,d])=>(
          <div key={k as string} className="border border-hairline rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-graphite">{k}</div>
            <div className="font-display text-xl font-light text-navy mt-1">{v}</div>
            <div className="text-[11px] text-civic">{d}</div>
          </div>
        ))}
      </div>
      <div className="border border-hairline rounded-lg p-3">
        <div className="text-[11px] uppercase tracking-[0.18em] text-graphite mb-2">Live ticker</div>
        <ul className="text-[12px] space-y-1.5 text-ink">
          <li><span className="text-civic mr-2">●</span>Kasarani 042 — ballots delivered</li>
          <li><span className="text-civic mr-2">●</span>Embakasi 117 — agent check-in</li>
          <li><span className="text-navy mr-2">●</span>Roysambu 008 — short queue resolved</li>
        </ul>
      </div>
    </StageFrame>
  );
}

function StageGov() {
  return (
    <StageFrame title="Governance · Day 1">
      <div className="font-display text-xl font-light text-navy mb-3">Mandate → Delivery Plan</div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-graphite mb-2">Campaign</div>
          {["Manifesto","Communities","Issues"].map(t=>(
            <div key={t} className="border border-hairline rounded-md px-3 py-2 mb-1.5 text-[12px] text-graphite">{t}</div>
          ))}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-civic mb-2">Governance</div>
          {["Development Plan","Citizen Communities","Service Requests"].map(t=>(
            <div key={t} className="border border-civic/30 bg-civic/5 rounded-md px-3 py-2 mb-1.5 text-[12px] text-navy">{t}</div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-[11px] text-graphite">Institutional memory · preserved</div>
    </StageFrame>
  );
}
