import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, SECTORS, slugToLabel } from "@/lib/market-data";

export function generateStaticParams() {
  const unique = [...new Map(INDUSTRIES.map((i) => [i.slug, i])).values()];
  return unique.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const ind = INDUSTRIES.find((i) => i.slug === industry);
  const label = ind?.label ?? slugToLabel(industry);
  return {
    title: `${label} | AInvest Market`,
    description: `Stocks in the ${label} industry. Browse top gainers, losers, and trending names.`,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const ind = INDUSTRIES.find((i) => i.slug === industry);
  if (!ind) notFound();
  const sector = SECTORS.find((s) => s.slug === ind.sector);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/market" className="hover:text-[#00d4aa]">Market</Link>
        {sector && (<><span>›</span><Link href={`/market/stocks-usa/sector/${sector.slug}`} className="hover:text-[#00d4aa]">{sector.label}</Link></>)}
        <span>›</span><span>{ind.label}</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{ind.label}</h1>
      {sector && <p className="text-gray-500 mb-8">Part of the <Link href={`/market/stocks-usa/sector/${sector.slug}`} className="text-[#00d4aa] hover:underline">{sector.label}</Link> sector.</p>}

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-gray-500">
        <div className="text-4xl mb-4">📊</div>
        <p className="font-medium mb-2">Live stock data coming soon</p>
        <p className="text-sm mb-6">Connect a market data provider to see all stocks in this industry with real-time prices.</p>
        <Link href="/aime/screener"
          className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors text-sm">
          Screen {ind.label} Stocks with AIME →
        </Link>
      </div>
    </div>
  );
}
