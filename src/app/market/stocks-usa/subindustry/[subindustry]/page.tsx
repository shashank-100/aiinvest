import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SUBINDUSTRIES, slugToLabel } from "@/lib/market-data";

export function generateStaticParams() {
  return SUBINDUSTRIES.map((s) => ({ subindustry: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ subindustry: string }> }): Promise<Metadata> {
  const { subindustry } = await params;
  const s = SUBINDUSTRIES.find((x) => x.slug === subindustry);
  const label = s?.label ?? slugToLabel(subindustry);
  return {
    title: `${label} Stocks | AInvest`,
    description: `Browse stocks in the ${label} sub-industry. Top gainers, losers, and AI analysis.`,
  };
}

export default async function SubIndustryPage({ params }: { params: Promise<{ subindustry: string }> }) {
  const { subindustry } = await params;
  const s = SUBINDUSTRIES.find((x) => x.slug === subindustry);
  if (!s) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <Link href="/market" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← Market</Link>
      <h1 className="text-3xl font-bold mb-2">{s.label}</h1>
      <p className="text-gray-500 mb-8">Sub-industry overview — browse all stocks and get AI-powered analysis.</p>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-gray-500">
        <div className="text-4xl mb-4">🔬</div>
        <p className="font-medium mb-2">Live stock data coming soon</p>
        <p className="text-sm mb-6">Connect a market data provider to see all {s.label} stocks with real-time prices and AI signals.</p>
        <Link href="/aime/screener"
          className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors text-sm">
          Screen {s.label} Stocks with AIME →
        </Link>
      </div>
    </div>
  );
}
