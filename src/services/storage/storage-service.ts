/**
 * Generic Chrome storage service
 * Provides low-level get/set operations for Chrome local storage
 */

export interface StorageService {
  get: <T>(key: string) => Promise<T>;
  set: <T>(key: string, value: T) => Promise<void>;
}

export const storageService: StorageService = {
  get: async <T>(key: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[key]);
        }
      });
    });
  },

  set: async <T>(key: string, value: T): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  },
};
