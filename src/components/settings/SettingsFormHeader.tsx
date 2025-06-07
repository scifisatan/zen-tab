export const SettingsHeader: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <div className="mb-4 space-y-1">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
};
