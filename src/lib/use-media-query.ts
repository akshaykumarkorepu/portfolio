"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. Returns false on the server and during
 * hydration, so the first client render matches the server HTML.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
