import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/insiflow/TopBar";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — InsiFlow AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <TopBar crumbs={["Admin", "Settings"]} />
      <div className="mx-auto max-w-3xl space-y-6 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workspace Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your organization, integrations, and connected sources.</p>
        </div>

        <section className="rounded-2xl border border-border bg-panel p-6">
          <h3 className="text-sm font-semibold">Profile</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Name" value="Alex Voss" />
            <Field label="Role" value="Product Manager" />
            <Field label="Email" value="alex.voss@globalops.io" />
            <Field label="Team" value="Enterprise Platform" />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-panel p-6">
          <h3 className="text-sm font-semibold">Connected Data Sources</h3>
          <div className="mt-4 divide-y divide-border">
            {[
              { name: "Snowflake", status: "Connected", warehouse: "PROD_XL" },
              { name: "Databricks", status: "Connected", warehouse: "analytics-cluster" },
              { name: "AWS Glue", status: "Connected", warehouse: "us-east-1" },
              { name: "AWS Athena", status: "Connected", warehouse: "primary" },
              { name: "OpenAI", status: "Active", warehouse: "Enterprise key" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">{s.warehouse}</div>
                </div>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">{s.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface/50 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
