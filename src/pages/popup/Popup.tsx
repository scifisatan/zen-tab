import { useState, useEffect } from "react";
import { useStorage, readStorage, setStorage } from "@src/hooks/useStorage";
import { JiraConfig } from "@src/types";

const JiraSettingsPopup = () => {
  const [config, setConfig] = useStorage<JiraConfig>(
    "jiraConfig",
    {
      apiToken: "",
      jiraDomain: "",
      email: "",
      jql: "assignee = currentUser() AND resolution = Unresolved ORDER BY priority DESC, updated DESC",
    },
    "sync",
  );

  const [formData, setFormData] = useState({
    apiToken: "",
    jiraDomain: "",
    workEmail: "",
    jql: "assignee = currentUser() AND resolution = Unresolved ORDER BY priority DESC, updated DESC",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Load saved settings on component mount and when config changes
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const savedConfig = await readStorage<JiraConfig>("jiraConfig", "sync");
        if (savedConfig) {
          setFormData({
            apiToken: savedConfig.apiToken || "",
            jiraDomain: savedConfig.jiraDomain || "",
            workEmail: savedConfig.email || "",
            jql:
              savedConfig.jql ||
              "assignee = currentUser() AND resolution = Unresolved ORDER BY priority DESC, updated DESC",
          });
        }
      } catch (error) {
        console.warn("Error loading config:", error);
      }
    };

    // If config from useStorage is available, use it
    if (config && (config.apiToken || config.jiraDomain || config.email)) {
      setFormData({
        apiToken: config.apiToken || "",
        jiraDomain: config.jiraDomain || "",
        workEmail: config.email || "",
        jql:
          config.jql ||
          "assignee = currentUser() AND resolution = Unresolved ORDER BY priority DESC, updated DESC",
      });
    } else {
      // Otherwise, try to load from storage directly
      loadConfig();
    }
  }, [config]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateJiraDomain = (domain: string): string => {
    // Remove protocol if present
    let cleanDomain = domain.replace(/^https?:\/\//, "");
    // Remove trailing slash
    cleanDomain = cleanDomain.replace(/\/$/, "");

    // Check if it looks like a valid Jira domain
    if (!cleanDomain.includes(".")) {
      throw new Error(
        "Invalid domain format. Please enter a valid domain like 'company.atlassian.net'",
      );
    }

    // Check for common Jira domain patterns
    if (
      !cleanDomain.includes("atlassian.net") &&
      !cleanDomain.includes("jira")
    ) {
      console.warn(
        "Domain doesn't appear to be a standard Jira domain. Please verify it's correct.",
      );
    }

    return cleanDomain.endsWith("/") ? cleanDomain : cleanDomain + "/";
  };

  const validateJQLQuery = async (config: JiraConfig): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://${config.jiraDomain}rest/api/3/search?jql=${encodeURIComponent(config.jql || "")}&maxResults=1`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Basic " + btoa(`${config.email}:${config.apiToken}`),
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid JQL query. Please check your query syntax.");
        }
        throw new Error(
          `JQL validation failed: ${response.status} ${response.statusText}`,
        );
      }

      await response.json(); // Validate JSON response
      return true;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Network error while validating JQL query.");
      }
      throw error;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus("");

    try {
      // Validate required fields
      if (!formData.apiToken.trim()) {
        throw new Error("API Token is required");
      }
      if (!formData.jiraDomain.trim()) {
        throw new Error("Jira Domain is required");
      }
      if (!formData.workEmail.trim()) {
        throw new Error("Work Email is required");
      }
      if (!formData.jql.trim()) {
        throw new Error("JQL Query is required");
      }

      // Validate email format
      if (!validateEmail(formData.workEmail)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate and clean domain
      const cleanDomain = validateJiraDomain(formData.jiraDomain);

      const configToSave: JiraConfig = {
        apiToken: formData.apiToken.trim(),
        jiraDomain: cleanDomain,
        email: formData.workEmail.trim(),
        jql: formData.jql.trim(),
      };

      // Save to chrome storage using both the useStorage hook and setStorage
      const success = await setStorage("jiraConfig", configToSave, "sync");
      if (success) {
        setConfig(configToSave);
        setSaveStatus("Settings saved successfully!");

        // Auto-clear success message after 3 seconds
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        throw new Error("Failed to save settings to storage");
      }
    } catch (error) {
      setSaveStatus(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testJiraConnection = async (config: JiraConfig): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://${config.jiraDomain}rest/api/3/myself`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Basic " + btoa(`${config.email}:${config.apiToken}`),
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Invalid credentials. Please check your email and API token.",
          );
        } else if (response.status === 404) {
          throw new Error("Jira instance not found. Please check your domain.");
        } else if (response.status === 403) {
          throw new Error("Access forbidden. Please check your permissions.");
        } else {
          throw new Error(
            `Connection failed: ${response.status} ${response.statusText}`,
          );
        }
      }

      // Validate response is valid JSON
      const responseData = await response.json();
      if (!responseData || !responseData.emailAddress) {
        throw new Error(
          "Invalid response from Jira API. Please check your domain.",
        );
      }

      return true;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Network error. Please check your internet connection and domain.",
        );
      }
      throw error;
    }
  };

  const handleTestConnection = async () => {
    if (!formData.apiToken || !formData.jiraDomain || !formData.workEmail) {
      setSaveStatus("Please fill in all required fields before testing");
      return;
    }

    setIsLoading(true);
    setSaveStatus("Testing connection...");

    try {
      // Validate email format
      if (!validateEmail(formData.workEmail)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate and clean domain
      const cleanDomain = validateJiraDomain(formData.jiraDomain);

      const testConfig: JiraConfig = {
        apiToken: formData.apiToken.trim(),
        jiraDomain: cleanDomain,
        email: formData.workEmail.trim(),
        jql: formData.jql.trim(),
      };

      await testJiraConnection(testConfig);
      setSaveStatus("Connection successful! ✅");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus(`Connection failed: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestJQL = async () => {
    if (
      !formData.apiToken ||
      !formData.jiraDomain ||
      !formData.workEmail ||
      !formData.jql
    ) {
      setSaveStatus("Please fill in all required fields before testing JQL");
      return;
    }

    setIsLoading(true);
    setSaveStatus("Testing JQL query...");

    try {
      // Validate email format
      if (!validateEmail(formData.workEmail)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate and clean domain
      const cleanDomain = validateJiraDomain(formData.jiraDomain);

      const testConfig: JiraConfig = {
        apiToken: formData.apiToken.trim(),
        jiraDomain: cleanDomain,
        email: formData.workEmail.trim(),
        jql: formData.jql.trim(),
      };

      await validateJQLQuery(testConfig);
      setSaveStatus("JQL query is valid! ✅");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus(`JQL validation failed: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-gruvbox-bg0 text-gruvbox-fg h-full w-75 overflow-y-hidden p-4"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace, system-ui",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <img src="/icon-32.png" />
          <h1 className="text-xl font-semibold" style={{ color: "#fabd2f" }}>
            Zen Tab Settings
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* API Token */}
        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: "#ebdbb2" }}
          >
            API Token *
          </label>
          <input
            type="password"
            value={formData.apiToken}
            onChange={(e) => handleInputChange("apiToken", e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-sm focus:border-blue-500 focus:outline-none"
            style={{
              backgroundColor: "#3c3836",
              borderColor: "#504945",
              color: "#ebdbb2",
            }}
            placeholder="Your Jira API token"
          />
        </div>

        {/* Jira Domain */}
        <div>
          <label
            className="block text-sm font-medium"
            style={{ color: "#ebdbb2" }}
          >
            Jira Domain *
          </label>
          <input
            type="text"
            value={formData.jiraDomain}
            onChange={(e) => handleInputChange("jiraDomain", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-sm focus:border-blue-500 focus:outline-none"
            style={{
              backgroundColor: "#3c3836",
              borderColor: "#504945",
              color: "#ebdbb2",
            }}
            placeholder="company.atlassian.net"
          />
        </div>

        {/* Work Email */}
        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: "#ebdbb2" }}
          >
            Work Email *
          </label>
          <input
            type="email"
            value={formData.workEmail}
            onChange={(e) => handleInputChange("workEmail", e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-sm focus:border-blue-500 focus:outline-none"
            style={{
              backgroundColor: "#3c3836",
              borderColor: "#504945",
              color: "#ebdbb2",
            }}
            placeholder="your.email@company.com"
          />
        </div>

        {/* JQL Query */}
        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: "#ebdbb2" }}
          >
            JQL Query *
          </label>
          <textarea
            value={formData.jql}
            onChange={(e) => handleInputChange("jql", e.target.value)}
            rows={3}
            className="h-30 w-full resize-none overflow-y-hidden rounded-lg border border-gray-600 bg-gray-800 p-3 text-sm focus:border-blue-500 focus:outline-none"
            style={{
              backgroundColor: "#3c3836",
              borderColor: "#504945",
              color: "#ebdbb2",
            }}
            placeholder="assignee = currentUser() AND resolution = Unresolved"
          />
          <button
            onClick={handleTestJQL}
            disabled={
              isLoading ||
              !formData.apiToken ||
              !formData.jiraDomain ||
              !formData.workEmail ||
              !formData.jql
            }
            className="mt-2 rounded-lg border px-3 py-1 text-xs font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: "transparent",
              borderColor: "#504945",
              color: "#ebdbb2",
            }}
            onMouseEnter={(e) => {
              if (
                !isLoading &&
                formData.apiToken &&
                formData.jiraDomain &&
                formData.workEmail &&
                formData.jql
              ) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#3c3836";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "transparent";
              }
            }}
          >
            Test JQL Query
          </button>
        </div>
      </div>

      {/* Status Message */}
      {saveStatus && (
        <div
          className={`mt-4 rounded-lg p-3 text-sm ${
            saveStatus.includes("Error") || saveStatus.includes("failed")
              ? "bg-opacity-30 border border-red-500 bg-red-900 text-red-300"
              : saveStatus.includes("Testing")
                ? "bg-opacity-30 border border-yellow-500 bg-yellow-900 text-yellow-300"
                : "bg-opacity-30 border border-green-500 bg-green-900 text-green-300"
          }`}
        >
          {saveStatus}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            backgroundColor: isLoading ? "#665c54" : "#83a598",
            color: "#282828",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              (e.target as HTMLButtonElement).style.backgroundColor = "#8ec07c";
              (e.target as HTMLButtonElement).style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              (e.target as HTMLButtonElement).style.backgroundColor = "#83a598";
              (e.target as HTMLButtonElement).style.transform = "scale(1)";
            }
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-white"></div>
              Saving...
            </div>
          ) : (
            "Save Settings"
          )}
        </button>

        <button
          onClick={handleTestConnection}
          disabled={isLoading}
          className="w-full rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            backgroundColor: "transparent",
            borderColor: "#504945",
            color: "#ebdbb2",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              (e.target as HTMLButtonElement).style.backgroundColor = "#3c3836";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              (e.target as HTMLButtonElement).style.backgroundColor =
                "transparent";
            }
          }}
        >
          Test Connection
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        <p className="text-center text-xs opacity-60">
          Your settings are stored locally and securely
        </p>
      </div>
    </div>
  );
};

export default JiraSettingsPopup;
