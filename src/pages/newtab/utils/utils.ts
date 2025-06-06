export const getStatusClass = (status: string): string => {
  switch (status.toLowerCase().replace(" ", "")) {
    case "todo":
      return "status-todo";
    case "inprogress":
      return "status-in-progress";
    case "inreview":
      return "status-review";
    default:
      return "status-default";
  }
};
