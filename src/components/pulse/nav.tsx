import { PulseLogo } from "@/components/pulse/logo";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 pt-4 md:pt-6">
        <div className="flex items-center gap-4 rounded-full border border-hairline/80 bg-canvas/70 backdrop-blur-xl pl-4 pr-2 py-2">
          <a href="#top" className="text-navy shrink-0">
            <PulseLogo />
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-[13px] text-graphite ml-2 min-w-0">
            <a href="#problem" className="hover:text-navy transition-colors whitespace-nowrap">The Problem</a>
            <a href="#walkthrough" className="hover:text-navy transition-colors whitespace-nowrap">Lifecycle</a>
            <a href="#mission-control" className="hover:text-navy transition-colors whitespace-nowrap">Mission Control</a>
            <a href="#ecosystem" className="hover:text-navy transition-colors whitespace-nowrap">Platform</a>
            <a href="#governance" className="hover:text-navy transition-colors whitespace-nowrap">Governance</a>
          </nav>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy text-canvas px-4 py-2 text-[13px] font-medium hover:bg-ink transition-colors whitespace-nowrap"
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
