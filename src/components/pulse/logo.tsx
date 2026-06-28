import logoAsset from "@/assets/pulse-logo.png.asset.json";

export function PulseLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      aria-label="Pulse"
    >
      <img
        src={logoAsset.url}
        alt="Pulse"
        className="h-7 w-auto select-none"
        draggable={false}
      />
    </span>
  );
}
