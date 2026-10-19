"use client";

import { createContext, useContext } from "react";

/**
 * True once the intro loading screen has finished, so entrance animations
 * play in view instead of behind the loader. Defaults to true when no
 * provider is present.
 */
export const IntroContext = createContext(true);

export function useIntroComplete() {
  return useContext(IntroContext);
}
