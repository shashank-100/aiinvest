import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

export const metadata: Metadata = {
  title: "Investing 101 | AInvest Learn",
  description: "Beginner guides to stocks, orders, value investing, and market fundamentals.",
};

export const revalidate = 3600;

export default async function Investing101Page() {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, published_at")
    .eq("category", "investing-101")
    .order("published_at", { ascending: true });

  const posts = (data ?? []) as Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "published_at">[];

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link href="/learn" className="hover:text-[#00d4aa]">Learn</Link>
        <span>›</span>
        <span>Investing 101</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Investing 101</h1>
      <p className="text-gray-500 mb-10">Beginner guides to stocks, orders, value investing, and market fundamentals.</p>
      <div className="grid gap-4">
        {posts.map((p, i) => (
          <Link key={p.id} href={`/learn/${p.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#00d4aa] transition-colors group flex items-start gap-4">
            <span className="text-2xl font-bold text-gray-100 dark:text-gray-800 shrink-0 select-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-semibold text-base mb-1 group-hover:text-[#00d4aa] transition-colors">{p.title}</h2>
              {p.excerpt && <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
