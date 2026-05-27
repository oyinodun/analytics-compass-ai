import { seedDb, type DatasetRecord } from "@/lib/database";

const latency = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getHomeDashboardData() {
  await latency();
  const { kpis, insights, governanceFeed, dashboards, datasets, promptSuggestions } = seedDb;
  return { kpis, insights, governanceFeed, dashboards, datasets, promptSuggestions };
}

export async function searchDatasets(query: string): Promise<DatasetRecord[]> {
  await latency(80);
  const q = query.trim().toLowerCase();
  if (!q) return seedDb.datasets;
  return seedDb.datasets.filter(
    (d) => d.name.toLowerCase().includes(q) || d.tags.some((t) => t.includes(q)),
  );
}

export async function getAssistantBootstrap() {
  await latency(60);
  return {
    promptSuggestions: seedDb.promptSuggestions,
    regionFailures: seedDb.regionFailures,
  };
}
