import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTORS, getIndustriesForSector, slugToLabel } from "@/lib/market-data";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  const s = SECTORS.find((x) => x.slug === sector);
  return {
    title: s ? `${s.label} Sector | AInvest` : "Sector | AInvest",
    description: s?.desc,
  };
}

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = SECTORS.find((x) => x.slug === sector);
  if (!s) notFound();

  const industries = getIndustriesForSector(sector);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <Link href="/market" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← Market</Link>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{s.icon}</span>
        <h1 className="text-3xl font-bold">{s.label}</h1>
      </div>
      <p className="text-gray-500 mb-8">{s.desc}</p>

      <div className="flex gap-3 mb-10">
        <Link href={`/market/stocks-usa/sector/${sector}/industries`}
          className="bg-[#00d4aa] text-black font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#00bfa0] transition-colors">
          Industries →
        </Link>
        <Link href={`/market/stocks-usa/sector/${sector}/subindustries`}
          className="border border-gray-200 dark:border-gray-700 text-sm px-4 py-2 rounded-full hover:border-[#00d4aa] transition-colors">
          Sub-Industries →
        </Link>
      </div>

      {industries.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Industries in {s.label}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/market/stocks-usa/industry/${ind.slug}`}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm font-medium hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors">
                {ind.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
