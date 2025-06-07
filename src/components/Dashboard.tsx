import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import Section from "@/components/section";

export default function Dashboard() {
  const { dashboardConfig } = useDashboardConfig();
  console.log("Dashboard Config loaded in Dashboard", dashboardConfig);
  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row">
      {dashboardConfig.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}
