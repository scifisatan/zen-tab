import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import Section from "@/components/section";

export default function Dashboard() {
  const { dashboardConfig, setDashboardConfig, isLoading } =
    useDashboardConfig();

  if (isLoading || !dashboardConfig) {
    return null;
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
