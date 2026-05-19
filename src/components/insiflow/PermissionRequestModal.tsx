import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ShieldCheck, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataset?: { name: string; owner: string; access: string } | null;
};

const ROLES = ["Product Manager", "Program Manager", "TPM", "Engineer", "Data Analyst", "Executive"];

export function PermissionRequestModal({ open, onOpenChange, dataset }: Props) {
  const [role, setRole] = useState("Product Manager");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("30 days");
  const [stage, setStage] = useState<"form" | "submitting" | "routed">("form");

  useEffect(() => {
    if (open) {
      setStage("form");
      setReason("");
    }
  }, [open]);

  function submit() {
    if (!reason.trim() || reason.trim().length < 12) {
      toast.error("Please provide a clear business justification (12+ chars).");
      return;
    }
    setStage("submitting");
    setTimeout(() => {
      setStage("routed");
      toast.success(`Access request submitted for ${dataset?.name ?? "dataset"}`, {
        description: "Routed to Manager → Security → Data Owner",
      });
    }, 900);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-border bg-panel p-0 overflow-hidden">
        <div className="border-b border-border bg-surface/60 p-6">
          <DialogHeader>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-brand">
              <ShieldCheck className="size-3.5" /> Governed Access Request
            </div>
            <DialogTitle className="mt-2 text-xl">
              {dataset?.name ?? "Request dataset access"}
            </DialogTitle>
            <DialogDescription>
              {dataset
                ? `Owned by ${dataset.owner} · ${dataset.access} tier`
                : "Submit a governed permission request for review."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {stage !== "routed" ? (
          <div className="space-y-5 p-6">
            <Field label="Dataset">
              <div className="rounded-lg border border-border bg-surface/40 px-3 py-2 text-sm font-medium">
                {dataset?.name ?? "—"}
              </div>
            </Field>

            <Field label="Your role">
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      role === r
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Business justification">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="e.g. Q4 churn analysis for enterprise segment — needed to brief leadership on retention drivers."
                className="w-full resize-none rounded-lg border border-border bg-surface/40 px-3 py-2 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
              />
              <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Reviewed by the data owner and security.</span>
                <span>{reason.length} chars</span>
              </div>
            </Field>

            <Field label="Access duration">
              <div className="flex gap-2">
                {["7 days", "30 days", "90 days", "Permanent"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`flex-1 rounded-lg border px-2 py-1.5 text-xs transition ${
                      duration === d
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Field>

            <div className="rounded-xl border border-border bg-surface/40 p-4">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Approval Routing
              </div>
              <div className="flex items-center justify-between gap-2">
                {["You", "Manager", "Security", "Data Owner"].map((s, i, arr) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="grid size-7 place-items-center rounded-full border border-brand/40 bg-brand/10 text-[10px] font-bold text-brand">
                      {i + 1}
                    </div>
                    <span className="text-xs">{s}</span>
                    {i < arr.length - 1 && <ArrowRight className="size-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="gap-2">
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-foreground/5"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={stage === "submitting"}
                className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:opacity-90 disabled:opacity-60"
              >
                {stage === "submitting" ? (
                  <>
                    <Clock className="size-4 animate-spin" /> Routing…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Submit Request
                  </>
                )}
              </button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4 p-8 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="size-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Request submitted</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-mono text-foreground">REQ-{Math.floor(2050 + Math.random() * 400)}</span> was
                routed into the approval workflow. You'll get a notification when each stage is reviewed.
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:opacity-90"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}
