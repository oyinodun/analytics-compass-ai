import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/insiflow/TopBar";
import { Sparkline, LineChart, Donut } from "@/components/insiflow/Charts";
import { kpis, insights, governanceFeed, dashboards, datasets, promptSuggestions } from "@/lib/mock-data";
import { ArrowRight, Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Home — InsiFlow AI" },
      { name: "description", content: "Your enterprise data, intelligence, and governance — at a glance." },
    ],
  }),
  component: HomePage,
});

const toneIcon = { danger: AlertTriangle, brand: TrendingUp, warning: AlertTriangle, success: CheckCircle2 } as const;
const toneClasses: Record<string, string> = {
  danger: "border-danger/30 bg-danger/5 text-danger",
  brand: "border-brand/30 bg-brand/5 text-brand",
  warning: "border-warning/30 bg-warning/5 text-warning",
  success: "border-success/30 bg-success/5 text-success",
};

function HomePage() {
  return (
    <>
      <TopBar crumbs={["Workspace", "Home"]} />
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good morning, Alex</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here's what's happening across your data environment today.
            </p>
          </div>
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/20 transition hover:opacity-90"
          >
            <Sparkles className="size-4" /> New AI Analysis
          </Link>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="group rounded-2xl border border-border bg-panel p-5 transition-colors hover:border-brand/40"
            >
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {k.label}
              </div>
              <div className="mt-1 text-2xl font-bold text-foreground transition-colors group-hover:text-brand">
                {k.value}
              </div>
              <div
                className={`mt-1 text-[10px] font-medium ${
                  k.tone === "success" ? "text-success" : k.tone === "warning" ? "text-warning" : "text-muted-foreground"
                }`}
              >
                {k.delta}
              </div>
              <Sparkline seed={i + 2} className="mt-3" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Main */}
          <div className="col-span-12 space-y-6 lg:col-span-8">
            {/* AI Hero Prompt */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-panel p-6">
              <div className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full bg-brand/20 blur-3xl" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-brand">
                  <span className="size-2 animate-pulse rounded-full bg-brand" /> AI Query Assistant
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Ask anything across 4.2&nbsp;PB of organizational data.
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Natural language in — governed SQL, charts, and executive insights out.
                </p>
                <Link
                  to="/assistant"
                  className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-surface/70 p-3 text-sm text-muted-foreground transition hover:border-brand/40 hover:bg-surface"
                >
                  <Sparkles className="size-4 text-brand" />
                  <span className="flex-1 truncate">Show deployment failures by region in the last 30 days…</span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-panel px-2 py-1 text-[10px] font-mono">⌘ K</span>
                </Link>

                <div className="mt-4 flex flex-wrap gap-2">
                  {promptSuggestions.slice(0, 4).map((p) => (
                    <Link
                      key={p}
                      to="/assistant"
                      className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-brand/40 hover:text-foreground"
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Trend chart */}
            <div className="rounded-2xl border border-border bg-panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Weekly active users · all product lines</h3>
                  <p className="text-xs text-muted-foreground">Auto-refreshed from Core Product Usage · Snowflake</p>
                </div>
                <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">LIVE</span>
              </div>
              <LineChart seed={9} />
            </div>

            {/* Recent dashboards */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Recent Dashboards</h3>
                <Link to="/dashboards" className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                  View all <ArrowRight className="size-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dashboards.slice(0, 3).map((d, i) => (
                  <Link
                    to="/dashboards"
                    key={d.name}
                    className="group block overflow-hidden rounded-2xl border border-border bg-panel transition hover:border-brand/40"
                  >
                    <div className="grid-bg relative h-28 border-b border-border bg-surface/40">
                      <div className="absolute inset-0 p-3">
                        <Sparkline seed={i + 11} className="h-20" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-medium text-foreground group-hover:text-brand">{d.name}</div>
                      <div className="mt-1 text-[11px] text-muted-foreground">
                        {d.owner} · {d.updated} · {d.widgets} widgets
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-border bg-panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Executive Insights</h3>
                <Donut value={84} label="Health" />
              </div>
              <div className="space-y-3">
                {insights.slice(0, 3).map((it) => {
                  const Icon = toneIcon[it.tone];
                  return (
                    <div key={it.text} className={`rounded-xl border p-3 ${toneClasses[it.tone]}`}>
                      <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Icon className="size-3" /> {it.tag}</span>
                        <span className="opacity-70">{it.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-foreground/90">{it.text}</p>
                    </div>
                  );
                })}
              </div>
              <Link to="/insights" className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-border py-2 text-xs font-medium hover:bg-foreground/5">
                Open Briefing <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Governance Feed</h3>
                <Link to="/access" className="text-xs text-brand">View all</Link>
              </div>
              <div className="space-y-3">
                {governanceFeed.slice(0, 4).map((g) => (
                  <div key={g.who + g.time} className="flex gap-3">
                    <div className={`mt-1 size-2 shrink-0 rounded-full ${
                      g.kind === "granted" ? "bg-success" : g.kind === "pending" ? "bg-warning" : "bg-danger"
                    }`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{g.who}</span>
                        <Clock className="size-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{g.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{g.what}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-brand/30 bg-brand/10 p-6">
              <h3 className="text-sm font-semibold text-brand">Proactive Intelligence</h3>
              <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                We noticed you frequently query infrastructure logs. Generate a Weekly Reliability Dashboard?
              </p>
              <div className="mt-4 flex gap-2">
                <Link to="/dashboards" className="flex-1 rounded-lg bg-brand py-2 text-center text-[11px] font-bold text-brand-foreground">
                  Generate
                </Link>
                <button className="flex-1 rounded-lg border border-brand/40 py-2 text-[11px] font-bold text-brand">
                  Dismiss
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-panel p-6">
              <h3 className="mb-3 text-sm font-semibold">Trending Datasets</h3>
              <div className="space-y-2">
                {datasets.slice(0, 4).map((d) => (
                  <Link
                    key={d.name}
                    to="/datasets"
                    className="flex items-center justify-between rounded-lg border border-border bg-surface/50 p-2.5 transition hover:border-brand/40"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium">{d.name}</div>
                      <div className="text-[10px] text-muted-foreground">{d.owner} · {d.source}</div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      d.status === "Certified" ? "bg-success/10 text-success" :
                      d.status === "Restricted" ? "bg-danger/10 text-danger" :
                      d.status === "In Review" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>{d.status}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
