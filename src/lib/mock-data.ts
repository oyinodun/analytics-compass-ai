export const kpis = [
  { label: "Active Workspaces", value: "14", delta: "+2 this week", tone: "success" as const },
  { label: "Queries Executed", value: "1,248", delta: "98.4% success", tone: "muted" as const },
  { label: "Pending Requests", value: "3", delta: "Awaiting review", tone: "warning" as const },
  { label: "Compute Efficiency", value: "A+", delta: "Optimized", tone: "success" as const },
];

export const insights = [
  { tag: "RISK ALERT", tone: "danger" as const, time: "2h ago", text: "AWS egress costs projected to exceed budget by 22% this month." },
  { tag: "TREND DETECTED", tone: "brand" as const, time: "5h ago", text: "Retention for Tier 1 enterprise users improved 4.5% after SDK update." },
  { tag: "ANOMALY", tone: "warning" as const, time: "1d ago", text: "Infrastructure latency increased 12% in EU-West after the 04:00 UTC deployment." },
  { tag: "RECOMMENDATION", tone: "brand" as const, time: "1d ago", text: "Deployment failures correlate with API contract changes in service-orders." },
];

export const governanceFeed = [
  { kind: "granted", who: "Sarah Jenkins", what: "Editor access to Revenue_v2", time: "12m" },
  { kind: "pending", who: "Marcus Trent", what: "Customer_PII read access", time: "1h" },
  { kind: "revoked", who: "Liam Park", what: "Temporary access expired on Billing_Logs", time: "3h" },
  { kind: "granted", who: "Priya Shah", what: "Viewer access to Product_Engagement", time: "5h" },
];

export const datasets = [
  { name: "Core Product Usage", owner: "Growth Team", source: "Snowflake", freshness: "2m ago", queries: "4.8k/day", status: "Certified", access: "public", tags: ["product", "engagement"], rows: "1.2B" },
  { name: "Infrastructure Latency Logs", owner: "SRE Ops", source: "Databricks", freshness: "14s ago", queries: "3.2k/day", status: "Certified", access: "public", tags: ["infra", "reliability"], rows: "8.4B" },
  { name: "Customer PII Profiles", owner: "Trust & Safety", source: "Snowflake", freshness: "1h ago", queries: "0.4k/day", status: "Restricted", access: "restricted", tags: ["customer", "pii"], rows: "42M" },
  { name: "Cloud Billing Logs", owner: "FinOps", source: "AWS Athena", freshness: "5m ago", queries: "1.1k/day", status: "Legacy", access: "internal", tags: ["finance", "cloud"], rows: "320M" },
  { name: "Deployment Events", owner: "Platform Eng", source: "AWS Glue", freshness: "30s ago", queries: "2.6k/day", status: "Certified", access: "public", tags: ["deploy", "ci/cd"], rows: "78M" },
  { name: "Incident Management", owner: "SRE Ops", source: "Snowflake", freshness: "4m ago", queries: "0.9k/day", status: "Certified", access: "internal", tags: ["incident", "reliability"], rows: "4.1M" },
  { name: "Marketing Attribution", owner: "Marketing Ops", source: "Databricks", freshness: "1h ago", queries: "0.7k/day", status: "In Review", access: "internal", tags: ["marketing", "growth"], rows: "210M" },
  { name: "Revenue Analytics", owner: "Finance", source: "Snowflake", freshness: "10m ago", queries: "2.0k/day", status: "Certified", access: "restricted", tags: ["finance", "revenue"], rows: "92M" },
];

export const accessRequests = [
  { id: "REQ-2041", dataset: "Customer PII Profiles", requester: "Marcus Trent", role: "Product Manager", reason: "Q4 churn analysis for enterprise segment", status: "Pending Manager", submitted: "2h ago", approver: "Helena Voss" },
  { id: "REQ-2040", dataset: "Revenue Analytics", requester: "Priya Shah", role: "Program Manager", reason: "Executive briefing for Q3 close", status: "Security Review", submitted: "5h ago", approver: "Trust Office" },
  { id: "REQ-2038", dataset: "Infrastructure Latency Logs", requester: "Diego Alvarez", role: "TPM", reason: "Reliability review for EU deploy", status: "Approved", submitted: "1d ago", approver: "Helena Voss" },
  { id: "REQ-2035", dataset: "Deployment Events", requester: "Ana Lin", role: "Engineer", reason: "Root cause analysis for incident INC-441", status: "Approved", submitted: "2d ago", approver: "Auto-policy" },
  { id: "REQ-2031", dataset: "Marketing Attribution", requester: "Kenji Ito", role: "Data Analyst", reason: "Pipeline performance audit", status: "Rejected", submitted: "3d ago", approver: "Marketing Ops" },
];

export const dashboards = [
  { name: "Executive Operations", owner: "Helena Voss", updated: "2h ago", widgets: 12, type: "exec" },
  { name: "Cloud Reliability", owner: "SRE Ops", updated: "15m ago", widgets: 9, type: "infra" },
  { name: "Product KPI Overview", owner: "Growth Team", updated: "1h ago", widgets: 14, type: "product" },
  { name: "Deployment Monitoring", owner: "Platform Eng", updated: "5m ago", widgets: 8, type: "infra" },
  { name: "Customer Engagement", owner: "CX Team", updated: "1d ago", widgets: 11, type: "product" },
  { name: "Revenue Pulse", owner: "Finance", updated: "3h ago", widgets: 7, type: "exec" },
];

export const kpiRegistry = [
  { name: "Monthly Active Users", formula: "COUNT(DISTINCT user_id) WHERE event_ts >= NOW() - 30d", owner: "Growth Team", status: "Certified", impact: "North-star product metric tracked by leadership weekly.", datasets: ["Core Product Usage"], value: "142.8k", delta: "+12.4%" },
  { name: "Deployment Success Rate", formula: "COUNT(success)/COUNT(*) per release window", owner: "Platform Eng", status: "Certified", impact: "Tracks release health; drives go/no-go decisions.", datasets: ["Deployment Events"], value: "98.7%", delta: "+0.4%" },
  { name: "Customer Retention (30d)", formula: "Retained / Cohort size at d30", owner: "Growth Team", status: "Certified", impact: "Primary driver of LTV forecasting.", datasets: ["Core Product Usage", "Revenue Analytics"], value: "91.2%", delta: "+1.1%" },
  { name: "Infrastructure Availability", formula: "1 - (downtime_min / window_min)", owner: "SRE Ops", status: "Certified", impact: "SLA contractual metric; reported monthly to enterprise customers.", datasets: ["Infrastructure Latency Logs", "Incident Management"], value: "99.982%", delta: "-0.002%" },
  { name: "Incident MTTR", formula: "AVG(resolved_at - opened_at) per severity", owner: "SRE Ops", status: "In Review", impact: "Operational excellence indicator for on-call effectiveness.", datasets: ["Incident Management"], value: "34m", delta: "-6m" },
  { name: "Revenue Run-Rate", formula: "SUM(MRR) * 12 with currency normalization", owner: "Finance", status: "Certified", impact: "Board-level KPI for growth trajectory.", datasets: ["Revenue Analytics"], value: "$84.2M", delta: "+8.3%" },
];

// Tiny SVG-friendly time series
export const sparkline = (seed = 1, n = 24) => {
  const arr: number[] = [];
  let v = 50 + (seed % 10) * 3;
  for (let i = 0; i < n; i++) {
    v += Math.sin(i * 0.6 + seed) * 6 + (Math.cos(i * 0.3 + seed) * 4);
    arr.push(Math.max(8, Math.min(96, v)));
  }
  return arr;
};

export const regionFailures = [
  { label: "US-East", value: 60 },
  { label: "EU-West", value: 95 },
  { label: "AP-South", value: 40 },
  { label: "SA-East", value: 20 },
  { label: "EU-Central", value: 72 },
];

export const promptSuggestions = [
  "Show deployment failures by region in the last 30 days",
  "Compare weekly active users across product lines",
  "Show customer churn trends for Q2",
  "Analyze cloud infrastructure downtime by service",
  "Which datasets did my team query most this week?",
];
