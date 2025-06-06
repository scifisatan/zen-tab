import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

export type StorageArea = "sync" | "local";

type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * Returns a stateful value from storage, and a function to update it.
 */
export function useStorage<T>(
  key: string,
  initialValue: T,
  area: StorageArea = "local",
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    // Check if chrome.storage is available
    if (typeof chrome !== "undefined" && chrome.storage) {
      readStorage<T>(key, area).then((res) => {
        if (res) setStoredValue(res);
      });

      chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === area && changes.hasOwnProperty(key)) {
          if (changes[key].newValue) setStoredValue(changes[key].newValue);
        }
      });
    } else {
      // Fallback to localStorage for development/testing
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
      }
    }
  }, []);

  const setValueRef = useRef<SetValue<T>>(undefined);

  setValueRef.current = (value) => {
    // Allow value to be a function, so we have the same API as useState
    const newValue = value instanceof Function ? value(storedValue) : value;
    // Save to storage
    setStoredValue((prevState) => {
      if (typeof chrome !== "undefined" && chrome.storage) {
        setStorage<T>(key, newValue, area).then((success) => {
          if (!success) setStoredValue(prevState);
        });
      } else {
        // Fallback to localStorage for development/testing
        try {
          localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
          console.warn(`Error setting localStorage key "${key}":`, error);
          setStoredValue(prevState);
        }
      }

      return newValue;
    });
  };

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to storage.
  const setValue: SetValue<T> = useCallback(
    (value) => setValueRef.current?.(value),
    [],
  );

  return [storedValue, setValue];
}

/**
 * Retrieves value from chrome storage area
 *
 * @param key
 * @param area - defaults to local
 */
export async function readStorage<T>(
  key: string,
  area: StorageArea = "local",
): Promise<T | undefined> {
  try {
    // Check if chrome.storage is available
    if (typeof chrome !== "undefined" && chrome.storage) {
      const result = await chrome.storage[area].get(key);
      console.log("retrieved from chrome storage", result);
      return result?.[key];
    } else {
      // Fallback to localStorage for development/testing
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    }
  } catch (error) {
    console.warn(`Error reading ${area} storage key "${key}":`, error);
    return undefined;
  }
}

/**
 * Sets object in chrome storage area
 *
 * @param key
 * @param value - value to be saved
 * @param area - defaults to local
 */
export async function setStorage<T>(
  key: string,
  value: T,
  area: StorageArea = "local",
): Promise<boolean> {
  try {
    // Check if chrome.storage is available
    if (typeof chrome !== "undefined" && chrome.storage) {
      return true;
    } else {
      // Fallback to localStorage for development/testing
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
  } catch (error) {
    console.warn(`Error setting ${area} storage key "${key}":`, error);
    return false;
  }
}
