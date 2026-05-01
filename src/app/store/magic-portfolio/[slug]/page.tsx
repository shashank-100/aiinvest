import Link from "next/link";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type MagicPortfolio = Database["public"]["Tables"]["magic_portfolios"]["Row"];

export async function generateStaticParams() {
  const { data } = await supabase.from("magic_portfolios").select("slug");
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from("magic_portfolios").select("name, description").eq("slug", slug).single();
  const p = data as Pick<MagicPortfolio, "name" | "description"> | null;
  return {
    title: p ? `${p.name} Portfolio | AInvest` : "Magic Portfolio | AInvest",
    description: p?.description ?? undefined,
  };
}

export default async function PortfolioSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabase.from("magic_portfolios").select("*").eq("slug", slug).single();
  const p = data as MagicPortfolio | null;

  if (!p) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <Link href="/store/magic-portfolio" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">
        ← All Portfolios
      </Link>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold">{p.name}</h1>
        {p.ytd_return != null && (
          <span className={`text-2xl font-bold ${Number(p.ytd_return) >= 0 ? "text-green-500" : "text-red-500"}`}>
            {Number(p.ytd_return) >= 0 ? "+" : ""}{p.ytd_return}% YTD
          </span>
        )}
      </div>
      <p className="text-gray-500 mb-8">{p.description}</p>

      {p.holdings && p.holdings.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Top Holdings</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {p.holdings.map((ticker: string) => (
              <div key={ticker} className="bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 text-center font-semibold text-sm">
                {ticker}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center py-10 text-gray-500">
        <p className="mb-4">Full portfolio analytics and live performance data available with AIME.</p>
        <Link href="/aime" className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors">
          Try AIME Free →
        </Link>
      </div>
    </div>
  );
}
