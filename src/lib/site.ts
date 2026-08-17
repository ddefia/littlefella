export const SITE = {
  name: "little fella",
  legal: "little fella ventures",
  short: "lfv",
  email: "hello@littlefella.vc",
} as const;

export const SECTORS = [
  { name: "energy", line: "dispatchable power" },
  { name: "infrastructure", line: "nuclear, and the rest of the build" },
  { name: "space", line: "stations in orbit" },
  { name: "robots", line: "humanoids" },
  { name: "health", line: "good bacteria" },
] as const;

export type SectorName = (typeof SECTORS)[number]["name"];

export const COMPANIES = [
  {
    name: "Apptronik",
    line: "apollo, a humanoid robot",
    href: "https://apptronik.com",
    sector: "robots",
    logo: "/companies/apptronik.svg",
    invert: true,
  },
  {
    name: "Aalo Atomics",
    line: "factory-built nuclear plants for data centers",
    href: "https://www.aalo.com",
    sector: "infrastructure",
    logo: "/companies/aalo.svg",
    invert: false,
  },
  {
    name: "Exowatt",
    line: "stores solar heat for data centers",
    href: "https://exowatt.com",
    sector: "energy",
    logo: "/companies/exowatt.svg",
    invert: false,
  },
  {
    name: "Vast",
    line: "space stations in low earth orbit",
    href: "https://vastspace.com",
    sector: "space",
    logo: "/companies/vast.png",
    invert: false,
  },
] as const;
