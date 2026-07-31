"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ThemeId = "classic" | "golden" | "winter" | "emerald";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  description: string;
  /** Small colour swatch dots shown in the picker */
  swatches: string[];
}

export const THEMES: ThemeOption[] = [
  {
    id: "classic",
    name: "Classic Crimson",
    description: "Bold. Dramatic. Festive.",
    swatches: ["#090707", "#d93535", "#f5c86a"],
  },
  {
    id: "golden",
    name: "Golden Night",
    description: "Luxury. Warm. Cinematic.",
    swatches: ["#090909", "#E5C158", "#F5D061"],
  },
  {
    id: "winter",
    name: "Winter Blue",
    description: "Modern. Icy. Premium.",
    swatches: ["#080B14", "#3B82F6", "#93C5FD"],
  },
  {
    id: "emerald",
    name: "Emerald Evergreen",
    description: "Deep. Forest. Luxurious.",
    swatches: ["#0B0E0C", "#169E6C", "#D4AF37"],
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────
interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "classic",
  setTheme: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "dcl-theme";

function getStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "golden" || stored === "classic" || stored === "winter" || stored === "emerald")
      return stored;
  } catch {
    // SSR / storage blocked
  }
  return "classic";
}

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  // Remove all theme attributes first
  root.removeAttribute("data-theme");
  if (id !== "classic") {
    root.setAttribute("data-theme", id);
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("classic");

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    applyTheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // storage blocked
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme() {
  return useContext(ThemeContext);
}
