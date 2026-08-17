"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SectorName } from "@/lib/site";

type SectorFilter = {
  sector: SectorName | null;
  setSector: (sector: SectorName | null) => void;
};

const SectorFilterContext = createContext<SectorFilter | null>(null);

export function SectorFilterProvider({ children }: { children: ReactNode }) {
  const [sector, setSector] = useState<SectorName | null>(null);
  return (
    <SectorFilterContext.Provider value={{ sector, setSector }}>
      {children}
    </SectorFilterContext.Provider>
  );
}

export function useSectorFilter() {
  const value = useContext(SectorFilterContext);
  if (!value) {
    throw new Error("useSectorFilter needs SectorFilterProvider");
  }
  return value;
}
