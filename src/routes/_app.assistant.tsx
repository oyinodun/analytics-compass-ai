import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { TopBar } from "@/components/insiflow/TopBar";
import { BarChart } from "@/components/insiflow/Charts";
import { getAssistantBootstrap } from "@/lib/backend";
import { Sparkles, Send, Code2, Bookmark, Download, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_app/assistant")({
  loader: () => getAssistantBootstrap(),
  head: () => ({ meta: [{ title: "AI Query Assistant — InsiFlow AI" }] }),
  component: AssistantPage,
});

type Msg =
  | { role: "user"; text: string }
  | { role: "ai"; text: string; sql?: string; chart?: boolean; confidence?: number };

const seedConversation: Msg[] = [
  { role: "user", text: "Show deployment failures by region in the last 30 days and correlate them with infrastructure latency." },
  {
    role: "ai",
    text: "Analyzed deployment logs from AWS CloudWatch and latency metrics from Datadog across 5 regions. Detected a 15% correlation between eu-central-1 downtime and API-Gateway timeouts following the 04:00 UTC release window.",
    sql: `SELECT region,
       COUNT(*) FILTER (WHERE status = 'failed') AS failures,
       AVG(latency_ms)                          AS avg_latency
FROM   prod.deployment_events  d
JOIN   prod.infra_latency_logs l USING (region, hour_bucket)
WHERE  d.event_ts >= NOW() - INTERVAL '30 days'
GROUP  BY region
ORDER  BY failures DESC;`,
    chart: true,
    confidence: 96,
  },
];

function AssistantPage() {
  const { promptSuggestions, regionFailures } = Route.useLoaderData();
  const [messages, setMessages] = useState<Msg[]>(seedConversation);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `Based on the most recent governed datasets, here is what I found for: "${q}". I've generated a chart and the corresponding SQL — confidence is high based on data freshness and join cardinality.`,
          sql: `-- generated from: ${q}\nSELECT bucket, COUNT(*) AS events\nFROM   prod.product_engagement\nWHERE  event_ts >= NOW() - INTERVAL '30 days'\nGROUP  BY bucket\nORDER  BY bucket;`,
          chart: true,
          confidence: 92,
        },
      ]);
      setThinking(false);
    }, 1100);
  }

  return (
    <>
      <TopBar crumbs={["Intelligence", "AI Query Assistant"]} />
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-6 md:p-8">
        <div className="col-span-12 lg:col-span-9">
          <div className="overflow-hidden rounded-2xl border border-border bg-panel">
            <div className="flex items-center justify-between border-b border-border bg-surface/40 p-4">
              <div className="flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-brand" />
                <span className="text-sm font-semibold">Query Assistant</span>
                <span className="ml-2 rounded-md border border-border bg-panel px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                  InsiFlow-Enterprise-v4
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <button className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:bg-foreground/5">
                  <Bookmark className="size-3" /> Save
                </button>
                <button className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:bg-foreground/5">
                  <Download className="size-3" /> Export
                </button>
              </div>
            </div>

            <div ref={scrollerRef} className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex gap-4">
                    <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface text-xs font-bold">AV</div>
                    <div className="max-w-[80%] rounded-2xl bg-surface px-4 py-3 text-sm">{m.text}</div>
                  </div>
                ) : (
                  <AiMessage key={i} msg={m} />
                )
              )}
              {thinking && (
                <div className="flex gap-4">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-xs font-bold text-brand-foreground">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/60 px-4 py-3 text-sm text-muted-foreground">
                    <span className="size-1.5 animate-bounce rounded-full bg-brand" />
                    <span className="size-1.5 animate-bounce rounded-full bg-brand [animation-delay:120ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-brand [animation-delay:240ms]" />
                    <span>Reasoning across datasets…</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-surface/40 p-4">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-1.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask a follow-up question…"
                  className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => send()}
                  className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground hover:opacity-90"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="col-span-12 space-y-6 lg:col-span-3">
          <div className="rounded-2xl border border-border bg-panel p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Suggested Prompts</h3>
            <div className="space-y-2">
              {promptSuggestions.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-left text-xs transition hover:border-brand/40 hover:text-brand"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-panel p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Query History</h3>
            <ul className="space-y-2 text-xs">
              {["Cloud spend by service (Q3)", "Top 10 churn signals", "Deploy frequency vs. incidents", "Active users — weekly cohort"].map((q) => (
                <li key={q} className="cursor-pointer truncate rounded px-2 py-1 hover:bg-foreground/5">{q}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

function AiMessage({ msg }: { msg: Extract<Msg, { role: "ai" }> }) {
  const [showSql, setShowSql] = useState(false);
  return (
    <div className="flex gap-4">
      <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-xs font-bold text-brand-foreground">
        <Sparkles className="size-4" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="text-sm leading-relaxed text-foreground/90">{msg.text}</div>
        {msg.confidence != null && (
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-bold text-brand">
              {msg.confidence}% confidence
            </span>
            <span>· Sources: 3 datasets</span>
          </div>
        )}
        {msg.chart && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Regional Failure Distribution
              </span>
              <span className="rounded bg-brand/10 px-2 py-0.5 text-[10px] text-brand">Live Data</span>
            </div>
            <BarChart data={regionFailures} />
          </div>
        )}
        {msg.sql && (
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <button onClick={() => setShowSql((s) => !s)} className="flex w-full items-center justify-between px-4 py-2 text-xs hover:bg-foreground/5">
              <span className="inline-flex items-center gap-2 font-mono text-muted-foreground">
                <Code2 className="size-3" /> generated_query.sql
              </span>
              <ChevronDown className={`size-3 transition-transform ${showSql ? "rotate-180" : ""}`} />
            </button>
            {showSql && (
              <pre className="overflow-x-auto border-t border-border bg-surface/80 p-4 font-mono text-[11px] leading-relaxed text-foreground/80">{msg.sql}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
