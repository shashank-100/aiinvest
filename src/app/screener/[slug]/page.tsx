import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 3600;

type ScreenerPreset = Database["public"]["Tables"]["screener_presets"]["Row"];

export async function generateStaticParams() {
  const { data } = await supabase.from("screener_presets").select("slug");
  return (data ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from("screener_presets").select("name, description").eq("slug", slug).single();
  const s = data as Pick<ScreenerPreset, "name" | "description"> | null;
  return {
    title: s ? `${s.name} | AInvest Screener` : "Screener | AInvest",
    description: s?.description ?? undefined,
  };
}

export default async function ScreenerSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabase.from("screener_presets").select("*").eq("slug", slug).single();
  const preset = data as ScreenerPreset | null;

  if (!preset) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <Link href="/screener" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← All Screeners</Link>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold">{preset.name}</h1>
        {preset.featured && (
          <span className="bg-[#00d4aa]/10 text-[#00d4aa] text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
        )}
      </div>
      {preset.description && <p className="text-gray-500 mb-8">{preset.description}</p>}

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-gray-500">
        <div className="text-4xl mb-4">📊</div>
        <p className="font-medium mb-2">Live screener results powered by AIME</p>
        <p className="text-sm mb-6">Connect to a market data provider to see real-time results for this screener.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/aime/screener"
            className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors text-sm">
            Run with AIME →
          </Link>
          <Link href="/screener"
            className="border border-gray-200 dark:border-gray-700 px-6 py-2.5 rounded-full hover:border-[#00d4aa] transition-colors text-sm">
            Browse Screeners
          </Link>
        </div>
      </div>
    </div>
  );
}
