import Link from "next/link";
import type { Metadata } from "next";
import { SECTORS, INDUSTRY_GROUPS } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "Market | AInvest",
  description: "US stock market overview — sectors, industries, top gainers and losers.",
};

const quickViews = [
  { label: "Top Gainers", href: "/market/stocks-usa/top-gainers", icon: "📈" },
  { label: "Top Losers", href: "/market/stocks-usa/top-losers", icon: "📉" },
  { label: "Trending Stocks", href: "/market/stocks-usa/trending-stocks", icon: "🔥" },
];

export default function MarketPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Market</h1>
      <p className="text-gray-500 mb-10">US stocks overview — sectors, industries, movers.</p>

      {/* Quick views */}
      <div className="flex gap-3 mb-12 flex-wrap">
        {quickViews.map((v) => (
          <Link key={v.label} href={v.href}
            className="bg-[#00d4aa] text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors flex items-center gap-2">
            <span>{v.icon}</span> {v.label}
          </Link>
        ))}
      </div>

      {/* Sectors */}
      <h2 className="text-xl font-bold mb-4">Browse by Sector</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
        {SECTORS.map((s) => (
          <Link key={s.slug} href={`/market/stocks-usa/sector/${s.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors group">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-sm font-medium group-hover:text-[#00d4aa]">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Industry Groups */}
      <h2 className="text-xl font-bold mb-4">Browse by Industry Group</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {INDUSTRY_GROUPS.map((g) => (
          <Link key={g.slug} href={`/market/stocks-usa/industry-group/${g.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm font-medium hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors">
            {g.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
