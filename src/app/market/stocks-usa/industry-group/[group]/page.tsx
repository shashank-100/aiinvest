import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRY_GROUPS, slugToLabel } from "@/lib/market-data";

export function generateStaticParams() {
  return INDUSTRY_GROUPS.map((g) => ({ group: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }): Promise<Metadata> {
  const { group } = await params;
  const g = INDUSTRY_GROUPS.find((x) => x.slug === group);
  const label = g?.label ?? slugToLabel(group);
  return { title: `${label} | AInvest Market`, description: `Stocks in the ${label} industry group.` };
}

export default async function IndustryGroupPage({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params;
  const g = INDUSTRY_GROUPS.find((x) => x.slug === group);
  if (!g) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <Link href="/market" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← Market</Link>
      <h1 className="text-3xl font-bold mb-2">{g.label}</h1>
      <p className="text-gray-500 mb-8">Industry group overview — browse constituent industries and stocks.</p>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-gray-500">
        <div className="text-4xl mb-4">🏗️</div>
        <p className="font-medium mb-2">Live stock data coming soon</p>
        <p className="text-sm mb-6">Connect a market data provider to see all stocks in this industry group.</p>
        <Link href="/aime/screener"
          className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors text-sm">
          Screen with AIME →
        </Link>
      </div>
    </div>
  );
}
