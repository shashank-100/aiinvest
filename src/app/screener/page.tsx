import Link from "next/link";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Stock Screener | AInvest",
  description: "Filter 33,000+ stocks by technical signals, fundamentals, sector, and more.",
};

export const revalidate = 3600;

type ScreenerPreset = Database["public"]["Tables"]["screener_presets"]["Row"];

const quickScreeners = [
  { label: "Most Popular Stocks", href: "/screener/most-popular-stocks" },
  { label: "Top Gainers", href: "/screener/top-gain-stocks" },
  { label: "Top Losers", href: "/screener/top-loss-stocks" },
];

export default async function ScreenerPage() {
  const { data } = await supabase
    .from("screener_presets")
    .select("*")
    .order("featured", { ascending: false })
    .order("name");

  const presets = (data ?? []) as ScreenerPreset[];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Stock Screener</h1>
      <p className="text-gray-500 mb-8">
        Filter 33,000+ stocks by technical signals, fundamentals, sector, and AI-generated signals.
      </p>

      <div className="flex gap-3 mb-10 flex-wrap">
        {quickScreeners.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-[#00d4aa] text-black font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#00bfa0] transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Pre-Built Screeners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {presets.map((p) => (
          <Link
            key={p.id}
            href={`/screener/${p.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors"
          >
            <div className="text-sm font-medium">{p.name}</div>
            {p.description && (
              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</div>
            )}
            {p.featured && (
              <span className="inline-block mt-2 text-xs bg-[#00d4aa]/10 text-[#00d4aa] px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
