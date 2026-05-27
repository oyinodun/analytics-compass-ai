export type DatasetRecord = {
  id: string;
  name: string;
  owner: string;
  source: string;
  freshness: string;
  queries: string;
  status: "Certified" | "Restricted" | "Legacy" | "In Review";
  access: "public" | "restricted" | "internal";
  tags: string[];
  rows: string;
};

export type AccessRequestRecord = {
  id: string;
  dataset: string;
  requester: string;
  role: string;
  reason: string;
  status: string;
  submitted: string;
  approver: string;
};

export type InsightFlowDB = {
  kpis: Array<{ label: string; value: string; delta: string; tone: "success" | "muted" | "warning" }>;
  insights: Array<{ tag: string; tone: "danger" | "brand" | "warning" | "success"; time: string; text: string }>;
  governanceFeed: Array<{ kind: "granted" | "pending" | "revoked"; who: string; what: string; time: string }>;
  datasets: DatasetRecord[];
  accessRequests: AccessRequestRecord[];
  dashboards: Array<{ name: string; owner: string; updated: string; widgets: number; type: "exec" | "infra" | "product" }>;
  promptSuggestions: string[];
  regionFailures: Array<{ label: string; value: number }>;
};

export const dbSchemaSql = `
CREATE TABLE datasets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  source TEXT NOT NULL,
  freshness TEXT NOT NULL,
  queries TEXT NOT NULL,
  status TEXT NOT NULL,
  access TEXT NOT NULL,
  rows TEXT NOT NULL
);

CREATE TABLE dataset_tags (
  dataset_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  PRIMARY KEY(dataset_id, tag),
  FOREIGN KEY(dataset_id) REFERENCES datasets(id)
);

CREATE TABLE access_requests (
  id TEXT PRIMARY KEY,
  dataset TEXT NOT NULL,
  requester TEXT NOT NULL,
  role TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL,
  submitted TEXT NOT NULL,
  approver TEXT NOT NULL
);
`;

export const seedDb: InsightFlowDB = {
  kpis: [
    { label: "Active Workspaces", value: "14", delta: "+2 this week", tone: "success" },
    { label: "Queries Executed", value: "1,248", delta: "98.4% success", tone: "muted" },
    { label: "Pending Requests", value: "3", delta: "Awaiting review", tone: "warning" },
    { label: "Compute Efficiency", value: "A+", delta: "Optimized", tone: "success" },
  ],
  insights: [
    { tag: "RISK ALERT", tone: "danger", time: "2h ago", text: "AWS egress costs projected to exceed budget by 22% this month." },
    { tag: "TREND DETECTED", tone: "brand", time: "5h ago", text: "Retention for Tier 1 enterprise users improved 4.5% after SDK update." },
    { tag: "ANOMALY", tone: "warning", time: "1d ago", text: "Infrastructure latency increased 12% in EU-West after the 04:00 UTC deployment." },
  ],
  governanceFeed: [
    { kind: "granted", who: "Sarah Jenkins", what: "Editor access to Revenue_v2", time: "12m" },
    { kind: "pending", who: "Marcus Trent", what: "Customer_PII read access", time: "1h" },
    { kind: "revoked", who: "Liam Park", what: "Temporary access expired on Billing_Logs", time: "3h" },
  ],
  datasets: [
    { id: "ds_core_product_usage", name: "Core Product Usage", owner: "Growth Team", source: "Snowflake", freshness: "2m ago", queries: "4.8k/day", status: "Certified", access: "public", tags: ["product", "engagement"], rows: "1.2B" },
    { id: "ds_infra_latency", name: "Infrastructure Latency Logs", owner: "SRE Ops", source: "Databricks", freshness: "14s ago", queries: "3.2k/day", status: "Certified", access: "public", tags: ["infra", "reliability"], rows: "8.4B" },
    { id: "ds_customer_pii", name: "Customer PII Profiles", owner: "Trust & Safety", source: "Snowflake", freshness: "1h ago", queries: "0.4k/day", status: "Restricted", access: "restricted", tags: ["customer", "pii"], rows: "42M" },
  ],
  accessRequests: [
    { id: "REQ-2041", dataset: "Customer PII Profiles", requester: "Marcus Trent", role: "Product Manager", reason: "Q4 churn analysis for enterprise segment", status: "Pending Manager", submitted: "2h ago", approver: "Helena Voss" },
  ],
  dashboards: [
    { name: "Executive Operations", owner: "Helena Voss", updated: "2h ago", widgets: 12, type: "exec" },
    { name: "Cloud Reliability", owner: "SRE Ops", updated: "15m ago", widgets: 9, type: "infra" },
    { name: "Product KPI Overview", owner: "Growth Team", updated: "1h ago", widgets: 14, type: "product" },
  ],
  promptSuggestions: [
    "Show deployment failures by region in the last 30 days",
    "Compare weekly active users across product lines",
    "Show customer churn trends for Q2",
  ],
  regionFailures: [
    { label: "US-East", value: 60 },
    { label: "EU-West", value: 95 },
    { label: "AP-South", value: 40 },
  ],
};
