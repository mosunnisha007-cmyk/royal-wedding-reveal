import { useEffect, useState } from "react";

const CELL_MS = {
  day: 86_400_000,
  hour: 3_600_000,
  minute: 60_000,
  second: 1_000,
} as const;

function timeLeft(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / CELL_MS.day),
    hours: Math.floor(ms / CELL_MS.hour) % 24,
    minutes: Math.floor(ms / CELL_MS.minute) % 60,
    seconds: Math.floor(ms / CELL_MS.second) % 60,
  };
}

export function Countdown({
  targetISO,
  className = "",
}: {
  targetISO: string;
  className?: string;
}) {
  const target = new Date(targetISO).getTime();
  // Zeros until mounted so server render and client hydration always match.
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(() => timeLeft(target));

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => setLeft(timeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const shown = mounted ? left : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const cells = [
    ["Days", shown.days],
    ["Hours", shown.hours],
    ["Minutes", shown.minutes],
    ["Seconds", shown.seconds],
  ] as const;

  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 ${className}`}>
      {cells.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-gold/50 bg-card px-4 py-6 text-center shadow-[0_10px_30px_-18px_oklch(0.45_0.06_50/0.5)]"
        >
          <div className="font-display text-4xl tabular-nums text-foreground md:text-5xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
