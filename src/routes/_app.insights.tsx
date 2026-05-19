import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/insiflow/TopBar";
import { insights } from "@/lib/mock-data";
import { LineChart, Heatmap, Donut } from "@/components/insiflow/Charts";
import { Sparkles, Download, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/insights")({
  head: () => ({ meta: [{ title: "Executive Insights — InsiFlow AI" }] }),
  component: InsightsPage,
});

const toneIcon = { danger: AlertTriangle, brand: TrendingUp, warning: AlertTriangle, success: CheckCircle2 } as const;
const toneClasses: Record<string, string> = {
  danger: "border-danger/30 bg-danger/5",
  brand: "border-brand/30 bg-brand/5",
  warning: "border-warning/30 bg-warning/5",
  success: "border-success/30 bg-success/5",
};

function InsightsPage() {
  return (
    <>
      <TopBar crumbs={["Intelligence", "Executive Insights"]} />
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Executive Briefing</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              AI-summarized organizational signals · week of November 17.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-brand-foreground hover:opacity-90">
            <Download className="size-4" /> Download report
          </button>
        </div>

        {/* Top summary */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6 lg:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand">
              <Sparkles className="size-4" /> AI Executive Summary
            </div>
            <p className="mt-3 text-base leading-relaxed text-foreground/95">
              Platform-wide reliability is <span className="text-success">healthy at 99.98%</span>, but
              <span className="text-warning"> latency in EU-West-1 rose 12%</span> following the 04:00 UTC release window.
              Enterprise retention improved <span className="text-success">+4.5%</span> after the SDK update, while
              <span className="text-danger"> AWS egress is on track to exceed budget by 22%</span>. Recommend prioritizing
              the EU rollback review and FinOps cost workstream.
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-3 gap-4 lg:col-span-4">
            <div className="col-span-1 rounded-2xl border border-border bg-panel p-4 text-center"><Donut value={91} label="SLA" /></div>
            <div className="col-span-2 rounded-2xl border border-border bg-panel p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Risk Index</div>
              <div className="mt-1 text-3xl font-bold text-warning">Moderate</div>
              <div className="mt-2 text-[10px] text-muted-foreground">3 active alerts · 1 critical</div>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-surface">
                <div className="h-full w-[60%] bg-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {insights.map((it) => {
            const Icon = toneIcon[it.tone];
            return (
              <div key={it.text} className={`rounded-2xl border p-5 ${toneClasses[it.tone]}`}>
                <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1.5"><Icon className="size-3" /> {it.tag}</span>
                  <span className="text-muted-foreground">{it.time}</span>
                </div>
                <p className="text-sm leading-relaxed">{it.text}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-md border border-border bg-surface/60 px-2 py-1 text-[10px] hover:bg-foreground/5">View evidence</button>
                  <button className="rounded-md border border-border bg-surface/60 px-2 py-1 text-[10px] hover:bg-foreground/5">Acknowledge</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 rounded-2xl border border-border bg-panel p-6 lg:col-span-7">
            <h3 className="mb-3 text-sm font-semibold">Trend Forecast · 12 weeks</h3>
            <LineChart seed={13} />
          </div>
          <div className="col-span-12 rounded-2xl border border-border bg-panel p-6 lg:col-span-5">
            <h3 className="mb-3 text-sm font-semibold">Anomaly heatmap</h3>
            <Heatmap rows={7} cols={18} />
            <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
