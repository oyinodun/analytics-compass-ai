import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sparkles, LayoutDashboard, Database, ShieldCheck, BarChart3, Gauge, Lightbulb, Settings,
} from "lucide-react";

const groups = [
  {
    label: "Workspace",
    items: [
      { to: "/", label: "Home", icon: LayoutDashboard },
      { to: "/assistant", label: "AI Assistant", icon: Sparkles },
      { to: "/insights", label: "Executive Insights", icon: Lightbulb },
    ],
  },
  {
    label: "Data Catalog",
    items: [
      { to: "/datasets", label: "Dataset Discovery", icon: Database },
      { to: "/kpis", label: "KPI Registry", icon: Gauge },
      { to: "/dashboards", label: "Dashboard Studio", icon: BarChart3 },
    ],
  },
  {
    label: "Admin",
    items: [
      { to: "/access", label: "Access & Governance", icon: ShieldCheck },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-panel/60 backdrop-blur-xl md:flex">
      <div className="flex h-full w-full flex-col p-4">
        <Link to="/" className="mb-8 flex items-center gap-3 px-2">
          <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-tr from-brand to-cyan-400 font-bold text-brand-foreground glow-brand">
            <Sparkles className="size-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-foreground">InsiFlow AI</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Enterprise OS</div>
          </div>
        </Link>

        <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {g.label}
              </div>
              <ul className="space-y-0.5">
                {g.items.map((it) => {
                  const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
                  const Icon = it.icon;
                  return (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        className={[
                          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          active
                            ? "border border-brand/20 bg-brand/10 text-brand"
                            : "border border-transparent text-foreground/80 hover:bg-white/5 hover:text-foreground",
                        ].join(" ")}
                      >
                        <Icon className="size-4 opacity-80" />
                        <span className="font-medium">{it.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-auto rounded-xl border border-border bg-panel/70 p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Organization</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-brand/40 to-cyan-400/40 text-xs font-bold">
              GO
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">Global Ops</div>
              <div className="text-[10px] text-muted-foreground">Enterprise Plan · 84%</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
