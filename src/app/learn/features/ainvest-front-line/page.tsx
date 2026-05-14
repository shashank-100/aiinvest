import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByCategory } from "@/lib/blog";

export const metadata: Metadata = {
  title: "AInvest Front Line | Learn",
  description: "Market insights, AI investing strategies, and platform guides from the AInvest team.",
};

export default function AInvestFrontLinePage() {
  const posts = getPostsByCategory("ainvest-front-line");
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link href="/learn" className="hover:text-[#00d4aa]">Learn</Link>
        <span>›</span>
        <span>AInvest Front Line</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">AInvest Front Line</h1>
      <p className="text-gray-500 mb-10">Market insights, AI investing strategies, and platform guides. <span className="text-[#00d4aa] font-semibold">{posts.length} articles</span></p>
      <div className="grid gap-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/learn/${p.slug}`}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#00d4aa] transition-colors group">
            <h2 className="font-semibold text-base mb-1 group-hover:text-[#00d4aa] transition-colors">{p.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
