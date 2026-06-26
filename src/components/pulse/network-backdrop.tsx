import { useEffect, useRef } from "react";

/** Subtle animated network: nodes and pulsing lines on warm canvas */
export function NetworkBackdrop() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const lines = svg.querySelectorAll<SVGLineElement>("[data-link]");
    lines.forEach((l, i) => {
      l.style.animation = `fade-in-soft 2.4s ${0.4 + i * 0.12}s ease-out forwards`;
      l.style.opacity = "0";
    });
  }, []);
  // Pre-computed network positions
  const nodes = [
    [12, 18], [28, 11], [44, 22], [58, 9], [72, 24], [86, 14],
    [10, 38], [26, 46], [42, 40], [60, 50], [78, 42], [92, 52],
    [14, 66], [32, 72], [50, 64], [66, 78], [84, 70], [94, 84],
    [22, 88], [46, 92], [70, 90],
  ] as const;
  const links: [number, number][] = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[1,7],[2,8],[3,9],[4,10],[5,11],
    [6,7],[7,8],[8,9],[9,10],[10,11],[6,12],[7,13],[8,14],[9,15],[10,16],[11,17],
    [12,13],[13,14],[14,15],[15,16],[16,17],[12,18],[14,19],[16,20],
  ];
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="fade" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="oklch(0.22 0.07 256)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.22 0.07 256)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {links.map(([a, b], i) => {
        const [x1, y1] = nodes[a];
        const [x2, y2] = nodes[b];
        return (
          <line
            key={i}
            data-link
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#fade)"
            strokeWidth="0.08"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x} cy={y} r={i % 7 === 0 ? 0.45 : 0.22}
          fill={i % 9 === 0 ? "oklch(0.62 0.16 152)" : "oklch(0.22 0.07 256)"}
          opacity={i % 9 === 0 ? 0.9 : 0.55}
        />
      ))}
    </svg>
  );
}
