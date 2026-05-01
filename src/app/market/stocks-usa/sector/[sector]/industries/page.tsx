import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTORS, getIndustriesForSector } from "@/lib/market-data";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  const s = SECTORS.find((x) => x.slug === sector);
  return { title: s ? `${s.label} Industries | AInvest` : "Industries | AInvest" };
}

export default async function SectorIndustriesPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = SECTORS.find((x) => x.slug === sector);
  if (!s) notFound();
  const industries = getIndustriesForSector(sector);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/market" className="hover:text-[#00d4aa]">Market</Link>
        <span>›</span>
        <Link href={`/market/stocks-usa/sector/${sector}`} className="hover:text-[#00d4aa]">{s.label}</Link>
        <span>›</span>
        <span>Industries</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{s.label} — Industries</h1>
      <p className="text-gray-500 mb-8">{industries.length} industries in the {s.label} sector.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {industries.map((ind) => (
          <Link key={ind.slug} href={`/market/stocks-usa/industry/${ind.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm font-medium hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors">
            {ind.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
