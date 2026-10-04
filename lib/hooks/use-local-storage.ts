"use client";

import {
  useCallback,
  useState,
  useSyncExternalStore,
  type SetStateAction,
} from "react";

type Listener = () => void;

const listenersByKey = new Map<string, Set<Listener>>();

function subscribeToStorageKey(key: string, callback: Listener) {
  let listeners = listenersByKey.get(key);

  if (!listeners) {
    listeners = new Set();
    listenersByKey.set(key, listeners);
  }

  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    // `key === null` means localStorage.clear() was called.
    if (event.key === key || event.key === null) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners?.delete(callback);

    if (listeners?.size === 0) {
      listenersByKey.delete(key);
    }

    window.removeEventListener("storage", handleStorage);
  };
}

function notifyStorageKey(key: string) {
  listenersByKey.get(key)?.forEach((listener) => {
    listener();
  });
}

function readStorageValue(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parseStorageValue<T>(value: string | null, fallback: T): T {
  if (value === null) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Used only to detect hydration without useEffect + setState.
const subscribeHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

/**
 * SSR-safe localStorage hook for Masar.
 *
 * - Works with Next.js App Router.
 * - Avoids reading refs during render.
 * - Syncs same-tab and cross-tab updates.
 * - Handles unavailable/corrupted localStorage safely.
 * - Does not require an effect to detect hydration.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  /**
   * Freeze the initial value for the lifetime of this hook instance.
   *
   * This is intentionally state instead of a ref because React 19's
   * render-time ref access rules prohibit reading ref.current during render.
   */
  const [defaultValue] = useState<T>(() => initialValue);

  const isMounted = useSyncExternalStore(
    subscribeHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return readStorageValue(key);
  }, [key]);

  const getServerSnapshot = useCallback(() => null, []);

  const subscribe = useCallback(
    (callback: Listener) => subscribeToStorageKey(key, callback),
    [key],
  );

  const rawValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const value = parseStorageValue(rawValue, defaultValue);

  const setValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      if (typeof window === "undefined") {
        return;
      }

      try {
        const currentRawValue = readStorageValue(key);
        const currentValue = parseStorageValue(currentRawValue, defaultValue);

        const resolvedValue =
          typeof nextValue === "function"
            ? (nextValue as (currentValue: T) => T)(currentValue)
            : nextValue;

        const serializedValue = JSON.stringify(resolvedValue);

        if (serializedValue === undefined) {
          window.localStorage.removeItem(key);
        } else if (serializedValue !== currentRawValue) {
          window.localStorage.setItem(key, serializedValue);
        } else {
          return;
        }

        notifyStorageKey(key);
      } catch (error) {
        console.warn(`تعذر تحديث localStorage للمفتاح "${key}".`, error);
      }
    },
    [defaultValue, key],
  );

  return [value, setValue, isMounted] as const;
}
