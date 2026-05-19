import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/insiflow/TopBar";
import { kpiRegistry } from "@/lib/mock-data";
import { Sparkline } from "@/components/insiflow/Charts";
import { Search, Sparkles, ShieldCheck, Database } from "lucide-react";

export const Route = createFileRoute("/_app/kpis")({
  head: () => ({ meta: [{ title: "KPI Registry — InsiFlow AI" }] }),
  component: KpiPage,
});

function KpiPage() {
  const [active, setActive] = useState(kpiRegistry[0]);
  const [q, setQ] = useState("");
  const list = kpiRegistry.filter((k) => k.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <TopBar crumbs={["Catalog", "KPI Registry"]} />
      <div className="mx-auto max-w-7xl p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">KPI Registry</h1>
            <p className="mt-1 text-sm text-muted-foreground">Certified business metrics with formulas, owners, and lineage.</p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search KPIs…"
              className="w-full rounded-lg border border-border bg-panel py-2 pl-9 pr-3 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-panel">
              {list.map((k, i) => (
                <button
                  key={k.name}
                  onClick={() => setActive(k)}
                  className={`flex w-full items-center justify-between border-b border-border p-4 text-left transition last:border-b-0 hover:bg-foreground/5 ${
                    active.name === k.name ? "bg-brand/5" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold">{k.name}</div>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        k.status === "Certified" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>{k.status}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{k.owner} · {k.datasets.length} dataset(s)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{k.value}</div>
                    <div className="text-[10px] text-success">{k.delta}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-border bg-panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{active.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Owned by {active.owner}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-1 text-[10px] font-bold text-success">
                  <ShieldCheck className="size-3" /> {active.status}
                </span>
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-4xl font-bold">{active.value}</span>
                <span className="text-sm font-medium text-success">{active.delta}</span>
              </div>
              <Sparkline seed={active.name.length} className="mt-3 h-16" />
            </div>

            <div className="rounded-2xl border border-border bg-panel p-6">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Formula</div>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs text-foreground/90">{active.formula}</pre>
            </div>

            <div className="rounded-2xl border border-brand/30 bg-brand/5 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand">
                <Sparkles className="size-4" /> Why this KPI matters
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{active.impact}</p>
            </div>

            <div className="rounded-2xl border border-border bg-panel p-6">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Linked Datasets</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.datasets.map((d) => (
                  <span key={d} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-xs">
                    <Database className="size-3 text-brand" /> {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
