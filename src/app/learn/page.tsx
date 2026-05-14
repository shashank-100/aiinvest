import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Learn | AInvest",
  description: "Learn investing, technical analysis, and fundamentals with AInvest.",
};

const sections = [
  { key: "investing-101" as const, title: "Investing 101", icon: "📘", href: "/learn/stocks/investing-101" },
  { key: "technical-analysis-101" as const, title: "Technical Analysis 101", icon: "📈", href: "/learn/stocks/technical-analysis-101" },
  { key: "fundamental-101" as const, title: "Fundamental Analysis 101", icon: "🏦", href: "/learn/stocks/fundamental-101" },
  { key: "ainvest-front-line" as const, title: "AInvest Front Line", icon: "✍️", href: "/learn/features/ainvest-front-line" },
];

export default function LearnPage() {
  const allPosts = getAllPosts();
  const byCategory = (key: string) => allPosts.filter((p) => p.category === key);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Learn</h1>
      <p className="text-gray-500 mb-10">
        From your first stock to advanced AI strategies — build your investing knowledge here.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((s) => {
          const posts = byCategory(s.key);
          return (
            <div key={s.key} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:border-[#00d4aa] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{s.icon}</span>
                <Link href={s.href} className="text-xl font-bold hover:text-[#00d4aa] transition-colors">
                  {s.title}
                </Link>
                <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{posts.length}</span>
              </div>
              <ul className="space-y-2 mb-4">
                {posts.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/learn/${p.slug}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00d4aa] flex items-center gap-2">
                      <span className="text-[#00d4aa]">→</span> {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={s.href} className="text-sm text-[#00d4aa] font-semibold hover:underline">
                View all {posts.length} articles →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
