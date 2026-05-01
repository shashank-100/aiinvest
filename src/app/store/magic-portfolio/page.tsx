import Link from "next/link";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Magic Portfolio | AInvest",
  description: "AI-curated portfolios across every investment style.",
};

export const revalidate = 3600;

type MagicPortfolio = Database["public"]["Tables"]["magic_portfolios"]["Row"];

export default async function MagicPortfolioPage() {
  const { data } = await supabase.from("magic_portfolios").select("*").order("name");
  const portfolios = (data ?? []) as MagicPortfolio[];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Magic Portfolios</h1>
      <p className="text-gray-500 mb-10">
        AI-curated stock portfolios across every investment style. Pick your strategy.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolios.map((p) => (
          <Link
            key={p.id}
            href={`/store/magic-portfolio/${p.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:border-[#00d4aa] transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg group-hover:text-[#00d4aa] transition-colors">
                {p.name}
              </h3>
              {p.ytd_return != null && (
                <span className={`text-sm font-bold ${Number(p.ytd_return) >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {Number(p.ytd_return) >= 0 ? "+" : ""}{p.ytd_return}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{p.description}</p>
            {p.risk_level && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                p.risk_level === "high" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                p.risk_level === "medium" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              }`}>
                {p.risk_level} risk
              </span>
            )}
            <div className="mt-4 text-[#00d4aa] text-sm font-semibold">View Portfolio →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
