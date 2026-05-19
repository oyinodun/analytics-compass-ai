import { Bell, Search, Command } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar({ crumbs }: { crumbs: string[] }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-md md:px-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-border">/</span>}
              <span className={i === crumbs.length - 1 ? "font-medium text-foreground" : ""}>{c}</span>
            </span>
          ))}
        </div>

        <div className="relative ml-auto w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search datasets, KPIs, dashboards…"
            className="w-full rounded-lg border border-border bg-panel/70 py-2 pl-9 pr-16 text-sm outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
          />
          <span className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            <Command className="size-3" /> K
          </span>
        </div>
      </div>

      <div className="ml-6 flex items-center gap-5">
        <div className="hidden items-center gap-2 md:flex">
          <span className="size-2 animate-pulse rounded-full bg-success" />
          <span className="text-xs font-medium text-muted-foreground">System Healthy</span>
        </div>
        <ThemeToggle />
        <button className="relative rounded-md p-2 text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-danger" />
        </button>
        <div className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-brand to-cyan-400 text-xs font-bold text-brand-foreground">AV</div>
      </div>
    </header>
  );
}
