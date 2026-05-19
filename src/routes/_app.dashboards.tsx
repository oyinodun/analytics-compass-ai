import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/insiflow/TopBar";
import { LineChart, BarChart, Heatmap, Donut, Sparkline } from "@/components/insiflow/Charts";
import { dashboards, regionFailures } from "@/lib/mock-data";
import { Sparkles, Plus, Share2, Download } from "lucide-react";

export const Route = createFileRoute("/_app/dashboards")({
  head: () => ({ meta: [{ title: "Dashboard Studio — InsiFlow AI" }] }),
  component: DashboardStudio,
});

function DashboardStudio() {
  return (
    <>
      <TopBar crumbs={["Catalog", "Dashboard Studio"]} />
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Studio</h1>
            <p className="mt-1 text-sm text-muted-foreground">Build or generate enterprise dashboards in seconds.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs hover:bg-foreground/5">
              <Plus className="size-4" /> Blank Dashboard
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-brand-foreground shadow-lg shadow-brand/20 hover:opacity-90">
              <Sparkles className="size-4" /> Generate with AI
            </button>
          </div>
        </div>

        {/* Active dashboard preview */}
        <div className="rounded-2xl border border-border bg-panel">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Cloud Reliability · EU-West</h3>
                <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">AI-GENERATED</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Owner: SRE Ops · 9 widgets · refreshed 15m ago</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-border p-2 hover:bg-foreground/5"><Share2 className="size-4" /></button>
              <button className="rounded-md border border-border p-2 hover:bg-foreground/5"><Download className="size-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 p-5">
            <Card className="col-span-12 md:col-span-3">
              <Label>Availability</Label>
              <div className="mt-2 text-3xl font-bold">99.98%</div>
              <div className="mt-1 text-[10px] text-success">+0.04% vs last week</div>
              <Sparkline seed={3} className="mt-3" />
            </Card>
            <Card className="col-span-12 md:col-span-3">
              <Label>P95 Latency</Label>
              <div className="mt-2 text-3xl font-bold">124<span className="text-base text-muted-foreground">ms</span></div>
              <div className="mt-1 text-[10px] text-warning">+4.1% vs last week</div>
              <Sparkline seed={5} className="mt-3" />
            </Card>
            <Card className="col-span-12 md:col-span-3">
              <Label>Deploy Success</Label>
              <div className="mt-2 text-3xl font-bold">98.7%</div>
              <div className="mt-1 text-[10px] text-success">+0.4% vs last week</div>
              <Sparkline seed={7} className="mt-3" />
            </Card>
            <Card className="col-span-12 md:col-span-3 flex items-center justify-center">
              <Donut value={91} label="SLA" />
            </Card>

            <Card className="col-span-12 md:col-span-8">
              <div className="mb-3 flex items-center justify-between">
                <Label>Latency vs throughput · 24h</Label>
                <span className="text-[10px] text-muted-foreground">brand = latency · dotted = baseline</span>
              </div>
              <LineChart seed={6} />
            </Card>
            <Card className="col-span-12 md:col-span-4">
              <Label>Failures by region</Label>
              <div className="mt-3"><BarChart data={regionFailures.slice(0, 4)} /></div>
            </Card>

            <Card className="col-span-12">
              <Label>Error heatmap · service × hour</Label>
              <div className="mt-3"><Heatmap rows={6} cols={24} /></div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">All Dashboards</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dashboards.map((d, i) => (
              <div key={d.name} className="group rounded-2xl border border-border bg-panel transition hover:border-brand/40">
                <div className="grid-bg relative h-32 overflow-hidden rounded-t-2xl border-b border-border bg-surface/40 p-4">
                  <Sparkline seed={i + 4} className="h-24" />
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold group-hover:text-brand">{d.name}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{d.owner} · {d.widgets} widgets · {d.updated}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-surface/50 p-4 ${className}`}>{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{children}</div>;
}
