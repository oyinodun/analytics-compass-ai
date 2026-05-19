import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/insiflow/Sidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <Sidebar />
      <div className="md:pl-64">
        <Outlet />
      </div>
    </div>
  );
}
