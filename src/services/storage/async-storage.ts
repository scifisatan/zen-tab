/**
 * Cross-browser async storage wrapper for browser extensions
 * Works with both Chrome (chrome.storage.local) and Firefox (browser.storage.local)
 * Compatible with TanStack Query's createAsyncStoragePersister
 */

export const asyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    const storage = getStorage();
    const result = await storage.get(key);
    return result[key] ?? null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    const storage = getStorage();
    await storage.set({ [key]: value });
  },
  removeItem: async (key: string): Promise<void> => {
    const storage = getStorage();
    await storage.remove(key);
  },
};

function getStorage():
  | typeof chrome.storage.local
  | typeof browser.storage.local {
  if (typeof browser !== "undefined" && browser.storage?.local) {
    return browser.storage.local;
  }
  return chrome.storage.local;
}
