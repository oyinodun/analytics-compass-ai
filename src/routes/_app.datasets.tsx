import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/insiflow/TopBar";
import { PermissionRequestModal } from "@/components/insiflow/PermissionRequestModal";
import { datasets } from "@/lib/mock-data";
import { Search, Database, ShieldCheck, Clock, Tag, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/datasets")({
  head: () => ({ meta: [{ title: "Dataset Discovery — InsiFlow AI" }] }),
  component: DatasetsPage,
});

const statusStyle: Record<string, string> = {
  Certified: "bg-success/10 text-success border-success/30",
  Restricted: "bg-danger/10 text-danger border-danger/30",
  Legacy: "bg-muted text-muted-foreground border-border",
  "In Review": "bg-warning/10 text-warning border-warning/30",
};

function DatasetsPage() {
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<(typeof datasets)[number] | null>(null);
  const filtered = datasets.filter(
    (d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.tags.some((t) => t.includes(q.toLowerCase()))
  );

  function requestAccess(d: (typeof datasets)[number]) {
    setActive(d);
    setModalOpen(true);
  }

  return (
    <>
      <TopBar crumbs={["Catalog", "Dataset Discovery"]} />
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dataset Marketplace</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              42 governed datasets across Snowflake, Databricks, AWS Glue, and Athena.
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search datasets, tags…"
              className="w-full rounded-lg border border-border bg-panel py-2 pl-9 pr-3 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-brand/30 bg-brand/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand">
            <Sparkles className="size-4" /> Suggested for your role · Product Manager
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on recent queries from your team, you may want access to <span className="text-foreground">Customer PII Profiles</span>, <span className="text-foreground">Marketing Attribution</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((d) => (
            <div
              key={d.name}
              className="group flex flex-col rounded-2xl border border-border bg-panel p-5 transition hover:border-brand/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-brand/10 text-brand">
                    <Database className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-brand">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground">{d.owner} · {d.source}</div>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusStyle[d.status]}`}>
                  {d.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                <Meta label="Rows" value={d.rows} />
                <Meta label="Freshness" value={d.freshness} />
                <Meta label="Usage" value={d.queries} />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {d.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                    <Tag className="size-2.5" /> {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  <ShieldCheck className="size-3" /> {d.access}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-border px-2.5 py-1 text-[11px] hover:bg-foreground/5">Preview</button>
                  <button
                    onClick={() => requestAccess(d)}
                    className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-medium text-brand-foreground hover:opacity-90"
                  >
                    Request Access
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-panel p-6">
          <h3 className="mb-4 text-sm font-semibold">Lineage Preview — Revenue Analytics</h3>
          <div className="grid-bg flex h-48 items-center justify-around rounded-xl border border-border bg-surface/40 px-6">
            {["Stripe", "Athena", "Glue ETL", "Snowflake", "Revenue Analytics"].map((n, i, arr) => (
              <div key={n} className="relative flex items-center">
                <div className="grid size-12 place-items-center rounded-lg border border-brand/30 bg-brand/10 text-[10px] font-semibold text-brand">
                  {n}
                </div>
                {i < arr.length - 1 && (
                  <div className="mx-3 flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3" /> <span className="text-[10px]">2m</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface/40 p-2">
      <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-xs font-medium">{value}</div>
    </div>
  );
}
