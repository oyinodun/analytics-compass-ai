import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/insiflow/TopBar";
import { PermissionRequestModal } from "@/components/insiflow/PermissionRequestModal";
import { accessRequests } from "@/lib/mock-data";
import { CheckCircle2, Clock, XCircle, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_app/access")({
  head: () => ({ meta: [{ title: "Access & Governance — InsiFlow AI" }] }),
  component: AccessPage,
});

const statusMeta: Record<string, { icon: typeof CheckCircle2; cls: string }> = {
  Approved: { icon: CheckCircle2, cls: "bg-success/10 text-success border-success/30" },
  "Pending Manager": { icon: Clock, cls: "bg-warning/10 text-warning border-warning/30" },
  "Security Review": { icon: ShieldCheck, cls: "bg-brand/10 text-brand border-brand/30" },
  Rejected: { icon: XCircle, cls: "bg-danger/10 text-danger border-danger/30" },
};

function AccessPage() {
  const [open, setOpen] = useState(false);
  const counts = {
    pending: accessRequests.filter((r) => r.status.includes("Pending") || r.status.includes("Review")).length,
    approved: accessRequests.filter((r) => r.status === "Approved").length,
    rejected: accessRequests.filter((r) => r.status === "Rejected").length,
  };
  return (
    <>
      <TopBar crumbs={["Admin", "Access & Governance"]} />
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Access & Governance</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enterprise data permissions, audit trails, and approval workflows.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Stat label="Pending" value={counts.pending} tone="warning" />
          <Stat label="Approved (30d)" value={counts.approved} tone="success" />
          <Stat label="Rejected (30d)" value={counts.rejected} tone="danger" />
        </div>

        <div className="rounded-2xl border border-border bg-panel">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="text-sm font-semibold">Active Requests</h3>
            <button
              onClick={() => setOpen(true)}
              className="rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground hover:opacity-90"
            >
              New Request
            </button>
          </div>
          <div className="divide-y divide-border">
            {accessRequests.map((r) => {
              const m = statusMeta[r.status];
              const Icon = m.icon;
              return (
                <div key={r.id} className="grid grid-cols-12 items-center gap-4 p-5 transition hover:bg-foreground/5">
                  <div className="col-span-12 md:col-span-4">
                    <div className="flex items-center gap-2 text-sm font-medium">{r.dataset}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{r.id} · {r.submitted}</div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <div className="text-xs">{r.requester}</div>
                    <div className="text-[11px] text-muted-foreground">{r.role}</div>
                  </div>
                  <div className="col-span-6 md:col-span-3 text-[11px] text-muted-foreground">
                    {r.reason}
                  </div>
                  <div className="col-span-12 md:col-span-2 flex justify-start md:justify-end">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${m.cls}`}>
                      <Icon className="size-3" /> {r.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 rounded-2xl border border-border bg-panel p-6">
            <h3 className="mb-4 text-sm font-semibold">Approval Workflow</h3>
            <div className="flex items-center justify-between gap-2">
              {["Requester", "Manager", "Security", "Data Owner", "Provisioned"].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`grid size-10 place-items-center rounded-full border ${
                    i < 3 ? "border-brand bg-brand/10 text-brand" : "border-border text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-medium">{step}</div>
                    <div className="text-[10px] text-muted-foreground">{i < 3 ? "Completed" : "Waiting"}</div>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="size-3 text-border" />}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 rounded-2xl border border-border bg-panel p-6">
            <h3 className="mb-4 text-sm font-semibold">Audit Trail</h3>
            <ul className="space-y-3 text-xs">
              {[
                { t: "12:04", e: "REQ-2041 created by Marcus Trent" },
                { t: "12:06", e: "Auto-policy check: PII payload detected" },
                { t: "12:11", e: "Routed to Helena Voss (Manager)" },
                { t: "12:42", e: "Manager approval granted" },
                { t: "13:01", e: "Security review opened" },
              ].map((a) => (
                <li key={a.t} className="flex gap-3">
                  <span className="font-mono text-muted-foreground">{a.t}</span>
                  <span className="flex-1 text-foreground/90">{a.e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <PermissionRequestModal open={open} onOpenChange={setOpen} dataset={null} />
    </>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "success" | "warning" | "danger" }) {
  const t = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger";
  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 text-3xl font-bold ${t}`}>{value}</div>
    </div>
  );
}
