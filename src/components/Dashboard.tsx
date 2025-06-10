import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import Section from "@/components/section";

export default function Dashboard() {
  const { dashboardConfig, setDashboardConfig, isLoading } =
    useDashboardConfig();

  if (isLoading || !dashboardConfig) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="text-muted-foreground mt-2 text-sm">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-hidden md:flex-row">
      {dashboardConfig.sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          setDashboardConfig={setDashboardConfig}
        />
      ))}
    </div>
  );
}
