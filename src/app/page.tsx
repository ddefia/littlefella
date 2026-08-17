import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { Close } from "@/components/close";
import { SectorFilterProvider } from "@/components/sector-filter";

export default function Home() {
  return (
    <SectorFilterProvider>
      <Nav />
      <main>
        <Hero />
        <Companies />
        <Close />
      </main>
    </SectorFilterProvider>
  );
}
