import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type DateRangePreset = "24h" | "7d" | "30d" | "90d" | "qtd" | "ytd";

export const DATE_RANGE_PRESETS: { id: DateRangePreset; label: string; days: number }[] = [
  { id: "24h", label: "Last 24 hours", days: 1 },
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 },
  { id: "qtd", label: "Quarter to date", days: 90 },
  { id: "ytd", label: "Year to date", days: 365 },
];

type Ctx = {
  preset: DateRangePreset;
  setPreset: (p: DateRangePreset) => void;
  label: string;
  days: number;
};

const DateRangeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "insiflow:date-range";

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [preset, setPresetState] = useState<DateRangePreset>("30d");

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY) as DateRangePreset | null;
      if (v && DATE_RANGE_PRESETS.some((p) => p.id === v)) setPresetState(v);
    } catch {}
  }, []);

  const setPreset = (p: DateRangePreset) => {
    setPresetState(p);
    try { localStorage.setItem(STORAGE_KEY, p); } catch {}
  };

  const value = useMemo<Ctx>(() => {
    const entry = DATE_RANGE_PRESETS.find((p) => p.id === preset) ?? DATE_RANGE_PRESETS[2];
    return { preset, setPreset, label: entry.label, days: entry.days };
  }, [preset]);

  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
}

export function useDateRange(): Ctx {
  const ctx = useContext(DateRangeContext);
  if (!ctx) return { preset: "30d", setPreset: () => {}, label: "Last 30 days", days: 30 };
  return ctx;
}
