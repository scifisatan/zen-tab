import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

// custom hook to set chrome local/sync storage
// should also set a listener on this specific key

type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * Returns a stateful value from storage, and a function to update it.
 */
export function useStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    readStorage<T>(key).then((res) => {
      if (res) setStoredValue(res);
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.hasOwnProperty(key)) {
        if (changes[key].newValue) setStoredValue(changes[key].newValue);
      }
    });
  }, []);

  const setValueRef = useRef<SetValue<T>>(() => {});

  setValueRef.current = (value) => {
    // Allow value to be a function, so we have the same API as useState
    const newValue = value instanceof Function ? value(storedValue) : value;
    // Save to storage
    setStoredValue((prevState) => {
      setStorage<T>(key, newValue).then((success) => {
        if (!success) setStoredValue(prevState);
      });

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
 * Retrieves value from chrome storage local
 *
 * @param key
 */
export async function readStorage<T>(key: string): Promise<T | undefined> {
  try {
    const result = await chrome.storage.local.get(key);
    return result?.[key];
  } catch (error) {
    console.warn(`Error reading local storage key "${key}":`, error);
    return undefined;
  }
}

/**
 * Sets object in chrome storage local
 *
 * @param key
 * @param value - value to be saved
 */
export async function setStorage<T>(key: string, value: T): Promise<boolean> {
  try {
    await chrome.storage.local.set({ [key]: value });
    return true;
  } catch (error) {
    console.warn(`Error setting local storage key "${key}":`, error);
    return false;
  }
}
