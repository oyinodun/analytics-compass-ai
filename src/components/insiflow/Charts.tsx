import { sparkline } from "@/lib/mock-data";

export function Sparkline({ seed = 1, className = "" }: { seed?: number; className?: string }) {
  const data = sparkline(seed, 28);
  const w = 200, h = 40;
  const step = w / (data.length - 1);
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / 100) * h}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={"h-10 w-full " + className}>
      <defs>
        <linearGradient id={`sg-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${seed})`} />
      <path d={path} fill="none" stroke="var(--brand)" strokeWidth="1.5" />
    </svg>
  );
}

export function BarChart({ data, max }: { data: { label: string; value: number }[]; max?: number }) {
  const m = max ?? Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-48 items-end gap-3 px-2">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t bg-gradient-to-t from-brand/30 to-brand transition-all"
              style={{ height: `${(d.value / m) * 100}%` }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({ seed = 7 }: { seed?: number }) {
  const a = sparkline(seed, 24);
  const b = sparkline(seed + 3, 24).map((v) => v * 0.85);
  const w = 600, h = 180;
  const step = w / (a.length - 1);
  const p = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / 100) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full">
      <defs>
        <linearGradient id="lg-a" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke="var(--border)" strokeDasharray="2 4" />
      ))}
      <path d={`${p(a)} L ${w} ${h} L 0 ${h} Z`} fill="url(#lg-a)" />
      <path d={p(a)} fill="none" stroke="var(--brand)" strokeWidth="2" />
      <path d={p(b)} fill="none" stroke="oklch(0.72 0.17 158)" strokeWidth="2" strokeDasharray="4 3" />
    </svg>
  );
}

export function Heatmap({ rows = 7, cols = 16 }: { rows?: number; cols?: number }) {
  const cells = Array.from({ length: rows * cols }, (_, i) => (Math.sin(i * 0.7) + Math.cos(i * 0.3) + 2) / 4);
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
      {cells.map((v, i) => (
        <div
          key={i}
          className="aspect-square rounded-[3px]"
          style={{ backgroundColor: `color-mix(in oklab, var(--brand) ${Math.round(v * 90)}%, var(--panel))` }}
        />
      ))}
    </div>
  );
}

export function Donut({ value = 78, label = "Health" }: { value?: number; label?: string }) {
  const r = 36, c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
        <circle cx="50" cy="50" r={r} stroke="var(--border)" strokeWidth="10" fill="none" />
        <circle
          cx="50" cy="50" r={r}
          stroke="var(--brand)" strokeWidth="10" fill="none"
          strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-bold">{value}%</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
