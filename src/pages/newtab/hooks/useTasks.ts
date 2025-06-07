import { useState, useEffect } from "react";
import { Task } from "@/types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Send message to background script to fetch Jira tasks
      const response = await chrome.runtime.sendMessage({
        action: "getJiraTasks",
      });

      if (response.success) {
        setTasks(response.tasks);
      } else {
        setError(response.error || "Failed to fetch tasks");
        // Fallback to mock tasks if API fails
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to communicate with background script");
      // Fallback to mock tasks
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const refreshTasks = () => {
    fetchTasks();
  };

  return {
    tasks,
    loading,
    error,
    refreshTasks,
  };
};
