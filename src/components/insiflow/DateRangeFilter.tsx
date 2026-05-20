import { useEffect, useRef, useState } from "react";
import { Calendar, Check, ChevronDown } from "lucide-react";
import { DATE_RANGE_PRESETS, useDateRange } from "@/lib/date-range";

export function DateRangeFilter() {
  const { preset, setPreset, label } = useDateRange();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-panel/70 px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-brand/40 hover:text-foreground"
        aria-label="Filter by date range"
      >
        <Calendar className="size-3.5 text-brand" />
        <span className="hidden sm:inline">{label}</span>
        <ChevronDown className="size-3 opacity-60" />
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-panel shadow-xl">
          <div className="border-b border-border px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Global date range
          </div>
          <ul className="py-1">
            {DATE_RANGE_PRESETS.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => { setPreset(p.id); setOpen(false); }}
                  className="flex w-full items-center justify-between px-3 py-2 text-xs hover:bg-foreground/5"
                >
                  <span>{p.label}</span>
                  {preset === p.id && <Check className="size-3.5 text-brand" />}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
            Applies to all modules.
          </div>
        </div>
      )}
    </div>
  );
}
