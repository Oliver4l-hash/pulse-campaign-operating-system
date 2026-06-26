import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/pulse/nav";
import { PulseLogo } from "@/components/pulse/logo";
import { NetworkBackdrop } from "@/components/pulse/network-backdrop";
import { MissionControlPreview } from "@/components/pulse/mission-control-preview";
import { CampaignWalkthrough } from "@/components/pulse/walkthrough";
import { EcosystemOrbit } from "@/components/pulse/ecosystem";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse — The Operating System for Modern Campaigns" },
      { name: "description", content: "Pulse unifies strategy, operations, intelligence and execution across the entire campaign lifecycle — from planning to governance." },
      { property: "og:title", content: "Pulse — The Operating System for Modern Campaigns" },
      { property: "og:description", content: "One operating system for strategy, operations, intelligence and execution." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-canvas text-ink overflow-x-clip">
      <Nav />
      <Hero />
      <ProblemSection />
      <ConceptSection />
      <CampaignWalkthrough />
      <MissionControlSection />
      <EcosystemSection />
      <FeatureShowcases />
      <IntelligenceSection />
      <GovernanceSection />
      <Closing />
      <Footer />
    </div>
  );
}

/* ============ HERO ============ */
function Hero() {
  return (
    <section className="relative pt-44 md:pt-52 pb-28 md:pb-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70">
        <NetworkBackdrop />
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-gradient-to-b from-canvas-warm/80 to-canvas" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="relative h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-civic animate-ping opacity-60" />
            <span className="relative block h-2 w-2 rounded-full bg-civic" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite">
            Pulse · Phase One · The Launch Experience
          </span>
        </div>

        <h1 className="display-xl text-navy max-w-[18ch] reveal reveal-delay-1">
          Campaigns move fast. Leadership should move <em className="not-italic text-civic font-normal">faster</em>.
        </h1>

        <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end">
          <p className="lede max-w-[44ch] reveal reveal-delay-2">
            One operating system for strategy, operations, intelligence and execution — from the first volunteer meeting to the day you start governing.
          </p>
          <div className="flex flex-wrap gap-3 reveal reveal-delay-3">
            <a href="#closing" className="inline-flex items-center gap-2 rounded-full bg-navy text-canvas px-6 py-3 text-sm font-medium hover:bg-ink transition-colors">
              Book private demonstration <span aria-hidden>→</span>
            </a>
            <a href="#walkthrough" className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card text-navy px-6 py-3 text-sm font-medium hover:border-navy/30 transition-colors">
              Explore the platform
            </a>
          </div>
        </div>

        <div className="mt-20 md:mt-28 reveal reveal-delay-4">
          <MissionControlPreview />
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline rounded-2xl overflow-hidden border border-hairline reveal reveal-delay-5">
          {[
            ["Workspaces", "23"],
            ["Lifecycle stages", "08"],
            ["Hours saved / week", "120+"],
            ["Built for", "Campaign + Governance"],
          ].map(([k, v]) => (
            <div key={k} className="bg-canvas-warm/40 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">{k}</div>
              <div className="mt-2 font-display text-2xl md:text-3xl font-light text-navy">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PROBLEM ============ */
function ProblemSection() {
  const { ref, shown } = useReveal();
  const tools = ["WhatsApp", "Spreadsheets", "Email threads", "Volunteer lists", "Paper maps", "PDFs", "Social DMs", "Shared drives", "SMS blasts", "Donor logs"];
  return (
    <section id="problem" className="relative py-32 md:py-44 border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="eyebrow mb-5">— The Current Reality</div>
            <h2 className="display-lg text-navy">Modern campaigns run on disconnected tools.</h2>
            <p className="lede mt-6">A movement is being held together by tabs. Decisions are made on instinct because the data lives in ten places at once.</p>
            <ul className="mt-8 space-y-3 text-graphite">
              {["Fragmented communication","Lost institutional knowledge","Poor operational visibility","Manual coordination","Reactive decision making"].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-6 bg-navy/50 flex-shrink-0" />
                  <span className="text-ink">{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={ref} className="md:col-span-7 relative min-h-[460px]">
            <div className="relative h-full rounded-2xl border border-hairline bg-canvas-warm/40 overflow-hidden grid-bg">
              {/* Scattered tools */}
              <div className="absolute inset-0">
                {tools.map((t, i) => {
                  const positions = [
                    [10, 14], [62, 8], [28, 38], [78, 26], [12, 62],
                    [50, 56], [82, 60], [22, 84], [60, 82], [40, 18],
                  ];
                  const [x, y] = positions[i];
                  return (
                    <div
                      key={t}
                      className={`absolute transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        shown ? "opacity-0 scale-90" : "opacity-100"
                      }`}
                      style={{
                        left: `${x}%`, top: `${y}%`,
                        transform: shown ? `translate(${(50 - x) * 0.6}%, ${(50 - y) * 0.6}%) scale(0.4)` : undefined,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    >
                      <div className="rounded-lg border border-hairline bg-card px-3 py-2 text-[12px] text-graphite shadow-sm font-mono">
                        {t}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Pulse core that appears */}
              <div
                className={`absolute inset-0 grid place-items-center transition-all duration-[1400ms] delay-700 ${
                  shown ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <div className="rounded-2xl border border-hairline bg-card px-8 py-6 shadow-[0_30px_80px_-30px_rgba(20,30,60,0.4)]">
                  <PulseLogo className="text-navy text-2xl" />
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">One synchronized ecosystem</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-graphite font-mono">Scroll to converge →</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CONCEPT ============ */
function ConceptSection() {
  return (
    <section id="concept" className="relative py-32 md:py-44 border-t border-hairline bg-canvas-warm/40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-3xl">
          <div className="eyebrow mb-5">— The Birth of Pulse</div>
          <h2 className="display-lg text-navy">
            Campaigns are organizations. Organizations need <em className="not-italic text-civic font-normal">operating systems</em>.
          </h2>
          <p className="lede mt-6">Pulse is the substrate beneath the movement — the place where strategy, people, information and decisions are held together as a single living system.</p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden">
          {[
            ["Strategy", "Theory of change, targets, milestones, decisions, accountability."],
            ["Operations", "People, regions, tasks, events, field coverage, communications."],
            ["Intelligence", "Polls, issues, sentiment, growth, projects, public trust."],
          ].map(([h, b], i) => (
            <div key={h} className="bg-canvas p-8">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-civic">Layer {String(i + 1).padStart(2, "0")}</div>
              <div className="font-display text-2xl text-navy mt-2">{h}</div>
              <p className="mt-3 text-graphite leading-relaxed text-[14px]">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="rounded-2xl border border-hairline bg-card p-8 md:p-12">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="space-y-2 text-right hidden md:block">
          {["Volunteers","WhatsApp","Maps","Spreadsheets","Events"].map(t=>(
            <div key={t} className="inline-block ml-auto rounded-full border border-hairline px-3 py-1 text-[11px] font-mono text-graphite">{t}</div>
          ))}
        </div>
        <div className="grid place-items-center">
          <div className="relative">
            <div className="absolute inset-0 -m-8 rounded-full border border-civic/30 animate-ping opacity-30" />
            <div className="relative grid place-items-center w-36 h-36 rounded-full bg-navy text-canvas">
              <PulseLogo className="text-canvas text-2xl" />
            </div>
          </div>
        </div>
        <div className="space-y-2 hidden md:block">
          {["Mission Control","Communities","Manifesto","Analytics","Governance"].map(t=>(
            <div key={t} className="rounded-full border border-civic/40 bg-civic/5 px-3 py-1 text-[11px] font-mono text-navy inline-block">{t}</div>
          ))}
        </div>
      </div>
      <div className="md:hidden mt-6 text-[12px] text-graphite font-mono text-center">Inputs → Pulse Core → Workspaces</div>
    </div>
  );
}

/* ============ MISSION CONTROL ============ */
function MissionControlSection() {
  return (
    <section id="mission-control" className="relative py-32 md:py-44 border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <div className="eyebrow mb-5">— Mission Control</div>
            <h2 className="display-lg text-navy">One workspace. The entire campaign.</h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 lede self-end">
            Strategy, operations, communications and movement health — assembled into a single executive view. Status is observed, not requested.
          </p>
        </div>
        <MissionControlPreview />
        <div className="mt-10 grid md:grid-cols-5 gap-4">
          {[
            ["Campaign Pulse Score","Live health index"],
            ["Operational Health Rings","Field · Comms · Data"],
            ["Decision Queue","Approve & resolve"],
            ["Timeline","T–142 to election"],
            ["Situation Map","Coverage at a glance"],
          ].map(([h,b])=>(
            <div key={h} className="border border-hairline rounded-xl p-4 bg-canvas-warm/30">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-civic">Infographic</div>
              <div className="text-navy font-medium mt-1.5">{h}</div>
              <div className="text-[12px] text-graphite mt-1">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ECOSYSTEM ============ */
function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative py-32 md:py-44 border-t border-hairline bg-canvas-warm/40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow mb-5">— The Platform</div>
            <h2 className="display-lg text-navy">Everything connected. Nothing isolated.</h2>
            <p className="lede mt-6">Twenty-three workspaces, one shared brain. Each module knows what the others know, so the campaign stops repeating itself.</p>
            <div className="mt-8 grid grid-cols-2 gap-2 text-[12px]">
              {["Single source of truth","Role-based permissions","Real-time sync","Audit-ready","Mobile-native","Built to transition"].map(t=>(
                <div key={t} className="flex items-center gap-2 text-ink">
                  <span className="h-1 w-1 rounded-full bg-civic" />{t}
                </div>
              ))}
            </div>
          </div>
          <EcosystemOrbit />
        </div>
      </div>
    </section>
  );
}

/* ============ FEATURE SHOWCASES ============ */
function FeatureShowcases() {
  const showcases = [
    { module: "Campaign Management", explanation: "Plan campaigns, assign coordinators, monitor milestones, review approvals and track execution from a centralized operational timeline." },
    { module: "Community", explanation: "Organize supporters into structured communities by geography and interests, enabling long-term engagement beyond election cycles." },
    { module: "Manifesto", explanation: "Present policy priorities through visual roadmaps, development plans and interactive project previews." },
    { module: "Polls & Feedback", explanation: "Gather structured feedback to identify recurring themes and inform planning. Present results transparently with aggregated insights." },
    { module: "Project Tracking", explanation: "Illustrate how proposed projects evolve from planning through implementation, allowing leadership and the public to follow progress." },
    { module: "Issue Tracking", explanation: "Community-reported issues are organized, categorized and prioritized for follow-up." },
    { module: "Mapping & Zoning", explanation: "Visualize campaign regions, administrative boundaries, field teams, events and operational coverage through layered interactive maps." },
    { module: "QR Distribution", explanation: "Printed campaign materials include QR codes that connect people directly to campaign information, events and community portals." },
  ];
  return (
    <section id="workspaces" className="relative py-32 md:py-44 border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-5">— Explore Every Workspace</div>
          <h2 className="display-lg text-navy">Each module is a small product. Together they're an operating system.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden">
          {showcases.map((s, i) => (
            <ShowcaseCard key={s.module} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ module, explanation, index }: { module: string; explanation: string; index: number }) {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className={`bg-canvas p-8 md:p-10 group transition-all duration-700 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-civic">{String(index + 1).padStart(2, "0")} · Workspace</span>
        <span aria-hidden className="text-graphite group-hover:text-navy transition-colors">↗</span>
      </div>
      <div className="font-display text-3xl font-light text-navy mt-3">{module}</div>
      <p className="mt-3 text-graphite leading-relaxed max-w-[52ch]">{explanation}</p>
      <div className="mt-6 rounded-lg border border-hairline bg-canvas-warm/40 p-4">
        <MiniPreview module={module} />
      </div>
    </div>
  );
}

function MiniPreview({ module }: { module: string }) {
  switch (module) {
    case "Mapping & Zoning":
      return (
        <svg viewBox="0 0 320 120" className="w-full">
          {Array.from({length:10}).map((_,i)=>(
            <rect key={i} x={i*30} y={20+(i%3)*15} width="26" height="26+i*2" fill={i%4===0?"oklch(0.78 0.09 152 / 0.4)":"oklch(0.95 0.008 80)"} stroke="oklch(0.85 0.012 80)" />
          ))}
          {[[40,50],[110,70],[200,40],[260,80]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="3" fill="oklch(0.22 0.07 256)" />
          ))}
        </svg>
      );
    case "QR Distribution":
      return (
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 40 40" className="w-20 h-20 bg-card border border-hairline rounded">
            {Array.from({length:64}).map((_,i)=>{
              const x = (i%8)*5, y = Math.floor(i/8)*5;
              const on = ((i*37)%5)<2;
              return <rect key={i} x={x} y={y} width="5" height="5" fill={on?"oklch(0.22 0.07 256)":"transparent"} />;
            })}
          </svg>
          <div className="text-[12px] text-graphite">Scan → instant access to events, manifesto and local community.</div>
        </div>
      );
    case "Polls & Feedback":
      return (
        <div className="space-y-1.5">
          {[["Water",45],["Health",28],["Youth",17]].map(([k,v])=>(
            <div key={k as string}>
              <div className="flex justify-between text-[11px]"><span>{k}</span><span className="text-graphite">{v}%</span></div>
              <div className="h-1.5 bg-hairline rounded-full overflow-hidden"><div className="h-full bg-navy" style={{width:`${v}%`}}/></div>
            </div>
          ))}
        </div>
      );
    case "Community":
      return (
        <div className="flex flex-wrap gap-1.5">
          {["Kasarani","Embakasi","Roysambu","Mathare","Dagoretti","Starehe","Makadara"].map(w=>(
            <span key={w} className="rounded-full border border-hairline px-2.5 py-1 text-[11px] text-graphite">{w}</span>
          ))}
        </div>
      );
    case "Manifesto":
      return (
        <div className="space-y-1.5">
          {["Water","Health","Youth","Roads"].map((t,i)=>(
            <div key={t} className="flex items-center gap-2 text-[12px]">
              <span className="font-mono text-graphite text-[10px]">0{i+1}</span>
              <span className="text-ink flex-1">{t}</span>
              <span className="text-civic text-[10px]">drafted</span>
            </div>
          ))}
        </div>
      );
    case "Project Tracking":
      return (
        <div className="flex items-center gap-1">
          {["Plan","Approve","Build","Deliver"].map((s,i)=>(
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full ${i<2?"bg-navy":"bg-hairline"}`} />
              <div className="text-[10px] mt-1 text-graphite">{s}</div>
            </div>
          ))}
        </div>
      );
    case "Issue Tracking":
      return (
        <ul className="text-[12px] space-y-1">
          {[["Potholes — Lumumba","In progress"],["Water — Pipeline","Under review"],["Lighting — Zone 4","Planned"]].map(([t,s])=>(
            <li key={t as string} className="flex justify-between border-b border-hairline last:border-0 py-1">
              <span className="text-ink">{t}</span><span className="text-graphite">{s}</span>
            </li>
          ))}
        </ul>
      );
    case "Campaign Management":
    default:
      return (
        <div className="grid grid-cols-3 gap-2">
          {["Plan","Run","Review"].map(t=>(
            <div key={t} className="rounded border border-hairline bg-card px-2 py-3 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">{t}</div>
              <div className="font-display text-lg text-navy">●</div>
            </div>
          ))}
        </div>
      );
  }
}

/* ============ INTELLIGENCE ============ */
function IntelligenceSection() {
  return (
    <section id="intelligence" className="relative py-32 md:py-44 border-t border-hairline bg-navy text-canvas overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] grid-bg" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-civic-soft mb-5">— Campaign Intelligence</div>
            <h2 className="display-lg text-canvas">Operational data becomes organizational awareness.</h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 self-end text-canvas/70 text-lg leading-relaxed max-w-[44ch]">
            Pulse turns the daily activity of the campaign into a clearer picture of where the movement is — and where it's going. Insight, not surveillance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-canvas/10 rounded-2xl overflow-hidden border border-canvas/10">
          {[
            { t: "Community Growth", v: "+18.4%", c: <Sparkline /> },
            { t: "Regional Coverage", v: "147/200 wards", c: <CoverageGrid /> },
            { t: "Campaign Health", v: "87 · Strong", c: <HealthBar /> },
            { t: "Project Pipeline", v: "42 active", c: <PipelineRow /> },
            { t: "Volunteer Activity", v: "4,128 live", c: <Sparkline up /> },
            { t: "Issue Heatmap", v: "12 hotspots", c: <Heatmap /> },
          ].map((x) => (
            <div key={x.t} className="bg-navy p-6">
              <div className="flex items-baseline justify-between">
                <div className="text-[10px] uppercase tracking-[0.18em] text-canvas/50 font-mono">{x.t}</div>
                <div className="text-canvas/90 font-mono text-[11px]">{x.v}</div>
              </div>
              <div className="mt-5 text-canvas">{x.c}</div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[12px] text-canvas/50 max-w-xl">
          Pulse illustrates organizational awareness — not persuasion. We measure how the movement is performing, never how to manipulate the people it serves.
        </p>
      </div>
    </section>
  );
}

function Sparkline({ up }: { up?: boolean }) {
  const pts = [10, 18, 14, 26, 22, 34, 30, 42, 38, 56, 48, 64];
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * 22} ${70 - p}`).join(" ");
  return (
    <svg viewBox="0 0 260 70" className="w-full h-20">
      <path d={d} fill="none" stroke="oklch(0.78 0.09 152)" strokeWidth="1.5" />
      <path d={`${d} L 242 70 L 0 70 Z`} fill="oklch(0.78 0.09 152)" fillOpacity="0.12" />
    </svg>
  );
}
function CoverageGrid() {
  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({length:50}).map((_,i)=>(
        <div key={i} className="aspect-square rounded-sm" style={{background: i<37?"oklch(0.78 0.09 152 / 0.85)":"oklch(1 0 0 / 0.08)"}} />
      ))}
    </div>
  );
}
function HealthBar() {
  return (
    <div className="space-y-2">
      {[["Field",94],["Comms",81],["Data",76]].map(([l,p])=>(
        <div key={l as string}>
          <div className="flex justify-between text-[11px] text-canvas/70"><span>{l}</span><span>{p}%</span></div>
          <div className="h-1.5 bg-canvas/10 rounded-full overflow-hidden"><div className="h-full bg-civic-soft" style={{width:`${p}%`}}/></div>
        </div>
      ))}
    </div>
  );
}
function PipelineRow() {
  return (
    <div className="grid grid-cols-4 gap-2 text-[10px] text-canvas/70 font-mono uppercase">
      {[["Plan",18],["Approve",10],["Build",9],["Deliver",5]].map(([s,n])=>(
        <div key={s as string} className="rounded border border-canvas/10 p-2">
          <div>{s}</div>
          <div className="font-display text-xl text-canvas mt-1">{n}</div>
        </div>
      ))}
    </div>
  );
}
function Heatmap() {
  return (
    <div className="grid grid-cols-12 gap-0.5">
      {Array.from({length:36}).map((_,i)=>{
        const v = (Math.sin(i*1.3)+1)/2;
        return <div key={i} className="aspect-square rounded-sm" style={{background:`oklch(0.78 0.09 152 / ${v*0.9})`}}/>;
      })}
    </div>
  );
}

/* ============ GOVERNANCE ============ */
function GovernanceSection() {
  const pairs = [
    ["Manifesto", "Development Plan"],
    ["Community", "Citizen Communities"],
    ["Events", "Public Forums"],
    ["Issue Collection", "Service Requests"],
    ["Campaign Projects", "Project Delivery"],
  ];
  return (
    <section id="governance" className="relative py-32 md:py-44 border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <div className="eyebrow mb-5">— Beyond Election Day</div>
            <h2 className="display-lg text-navy">The campaign doesn't end on election day. Neither should the platform.</h2>
          </div>
          <p className="md:col-span-5 md:col-start-8 lede self-end">
            Pulse preserves institutional knowledge and relationships. The mandate becomes a delivery plan — without rebuilding the muscle that earned it.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-6 md:p-10 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 mb-8 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">Campaign Workspace</div>
            <div className="text-civic">→</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-civic">Governance Workspace</div>
          </div>
          <div className="divide-y divide-hairline">
            {pairs.map(([c, g], i) => (
              <TransitionRow key={c} left={c} right={g} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TransitionRow({ left, right, delay }: { left: string; right: string; delay: number }) {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 py-5">
      <div className={`text-right transition-all duration-700 ${shown ? "opacity-100" : "opacity-30 -translate-x-2"}`}>
        <span className="inline-block rounded-lg border border-hairline px-4 py-2 text-navy">{left}</span>
      </div>
      <div className="relative w-16 md:w-32 h-px bg-hairline">
        <div
          className="absolute inset-y-0 left-0 bg-civic transition-all duration-[1200ms] ease-out"
          style={{ width: shown ? "100%" : "0%", transitionDelay: `${delay}s` }}
        />
        <div
          className={`absolute -top-1.5 transition-all duration-[1200ms] ease-out ${shown ? "left-full -translate-x-full" : "left-0"}`}
          style={{ transitionDelay: `${delay}s` }}
        >
          <span className="block h-3 w-3 rounded-full bg-civic" />
        </div>
      </div>
      <div className={`transition-all duration-700 ${shown ? "opacity-100" : "opacity-30 translate-x-2"}`} style={{ transitionDelay: `${delay + 0.6}s` }}>
        <span className="inline-block rounded-lg border border-civic/30 bg-civic/5 px-4 py-2 text-navy">{right}</span>
      </div>
    </div>
  );
}

/* ============ CLOSING ============ */
function Closing() {
  return (
    <section id="closing" className="relative py-40 md:py-56 border-t border-hairline overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <NetworkBackdrop />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 text-center">
        <div className="mx-auto inline-flex items-center gap-2 mb-10">
          <span className="relative h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-civic animate-ping opacity-60" />
            <span className="relative block h-2 w-2 rounded-full bg-civic" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite">The Future · Phase Two ahead</span>
        </div>
        <h2 className="display-xl text-navy max-w-[14ch] mx-auto">
          Lead with <em className="not-italic text-civic font-normal">clarity</em>.
        </h2>
        <p className="lede mt-8 mx-auto">A private demonstration walks your leadership through Pulse in 45 minutes. We tailor the conversation to your moment in the cycle.</p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-navy text-canvas px-7 py-3.5 text-sm font-medium hover:bg-ink transition-colors">
            Request private demonstration <span aria-hidden>→</span>
          </a>
          <a href="#" className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card text-navy px-7 py-3.5 text-sm font-medium hover:border-navy/30 transition-colors">
            Talk to the Pulse team
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="border-t border-hairline py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <PulseLogo className="text-navy text-2xl" />
            <p className="mt-3 text-[13px] text-graphite max-w-sm">The operating system for modern campaigns. Built for clarity. Built to transition into governance.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[13px]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite mb-3">Platform</div>
              <ul className="space-y-1.5 text-navy">
                <li><a href="#mission-control">Mission Control</a></li>
                <li><a href="#ecosystem">Workspaces</a></li>
                <li><a href="#intelligence">Intelligence</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite mb-3">Lifecycle</div>
              <ul className="space-y-1.5 text-navy">
                <li><a href="#walkthrough">Campaign</a></li>
                <li><a href="#governance">Governance</a></li>
                <li><a href="#closing">Talk to us</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite mb-3">Company</div>
              <ul className="space-y-1.5 text-navy">
                <li>Phase One — Launch</li>
                <li>Phase Two — Coming</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-hairline flex flex-col md:flex-row justify-between gap-3 text-[11px] text-graphite font-mono">
          <span>© {new Date().getFullYear()} Pulse</span>
          <span>Secure · Compliant · Transparent</span>
        </div>
      </div>
    </footer>
  );
}
