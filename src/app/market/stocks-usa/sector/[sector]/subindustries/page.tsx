import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTORS, SUBINDUSTRIES } from "@/lib/market-data";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  const s = SECTORS.find((x) => x.slug === sector);
  return { title: s ? `${s.label} Sub-Industries | AInvest` : "Sub-Industries | AInvest" };
}

export default async function SectorSubIndustriesPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = SECTORS.find((x) => x.slug === sector);
  if (!s) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/market" className="hover:text-[#00d4aa]">Market</Link>
        <span>›</span>
        <Link href={`/market/stocks-usa/sector/${sector}`} className="hover:text-[#00d4aa]">{s.label}</Link>
        <span>›</span>
        <span>Sub-Industries</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{s.label} — Sub-Industries</h1>
      <p className="text-gray-500 mb-8">All sub-industries within the {s.label} sector.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {SUBINDUSTRIES.map((sub) => (
          <Link key={sub.slug} href={`/market/stocks-usa/subindustry/${sub.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm font-medium hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors">
            {sub.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
