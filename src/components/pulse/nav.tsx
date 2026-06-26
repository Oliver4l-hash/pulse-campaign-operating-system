import { PulseLogo } from "@/components/pulse/logo";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-6">
        <div className="flex items-center justify-between rounded-full border border-hairline/80 bg-canvas/70 backdrop-blur-xl px-5 py-2.5">
          <a href="#top" className="text-navy"><PulseLogo /></a>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-graphite">
            <a href="#problem" className="hover:text-navy transition-colors">The Problem</a>
            <a href="#walkthrough" className="hover:text-navy transition-colors">The Lifecycle</a>
            <a href="#mission-control" className="hover:text-navy transition-colors">Mission Control</a>
            <a href="#ecosystem" className="hover:text-navy transition-colors">Platform</a>
            <a href="#governance" className="hover:text-navy transition-colors">Governance</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#closing" className="hidden sm:inline-flex items-center text-[13px] text-navy hover:text-civic transition-colors">
              Explore
            </a>
            <a
              href="#closing"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy text-canvas px-4 py-2 text-[13px] font-medium hover:bg-ink transition-colors"
            >
              Book demonstration
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
