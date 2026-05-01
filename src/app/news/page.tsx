import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Market News | AInvest",
  description: "Real-time market news, earnings, and macro insights — all summarized by AI.",
};

export const revalidate = 300;

type Article = Database["public"]["Tables"]["articles"]["Row"];

const categories = ["Latest", "Trending", "Earnings Season", "Expert Voices", "Newswire", "Articles"];

export default async function NewsPage() {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(24);

  const articles = (data ?? []) as Article[];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Market News</h1>
      <p className="text-gray-500 mb-8">AI-summarized news, earnings & macro insights in real time.</p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {categories.map((c, i) => (
          <button
            key={c}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-[#00d4aa] text-black"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a) => (
          <div
            key={a.id}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#00d4aa] transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-[#00d4aa]/10 text-[#00d4aa] text-xs font-semibold px-2 py-0.5 rounded-full">
                {a.tag}
              </span>
              <span className="text-xs text-gray-400">
                {a.published_at ? new Date(a.published_at).toLocaleDateString() : ""}
              </span>
            </div>
            <h3 className="font-semibold text-sm leading-snug">{a.title}</h3>
            {a.summary && <p className="mt-2 text-xs text-gray-500 line-clamp-2">{a.summary}</p>}
            <div className="mt-3 text-xs text-gray-400">{a.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
