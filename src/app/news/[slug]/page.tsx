import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 300;

type Article = Database["public"]["Tables"]["articles"]["Row"];

export async function generateStaticParams() {
  const { data } = await supabase.from("articles").select("slug");
  return (data ?? []).map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from("articles").select("title, summary").eq("slug", slug).single();
  const a = data as Pick<Article, "title" | "summary"> | null;
  return {
    title: a ? `${a.title} | AInvest` : "Article | AInvest",
    description: a?.summary ?? undefined,
    openGraph: {
      type: "article",
      title: a?.title ?? "AInvest Article",
      description: a?.summary ?? undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabase.from("articles").select("*").eq("slug", slug).single();
  const article = data as Article | null;

  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.published_at,
    author: { "@type": "Organization", name: article.source ?? "AInvest" },
    publisher: { "@type": "Organization", name: "AInvest" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <Link href="/news" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← Back to News</Link>

        <div className="flex items-center gap-3 mb-4">
          {article.tag && (
            <span className="bg-[#00d4aa]/10 text-[#00d4aa] text-xs font-semibold px-2 py-0.5 rounded-full">
              {article.tag}
            </span>
          )}
          {article.published_at && (
            <span className="text-xs text-gray-400">
              {new Date(article.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          )}
          {article.source && <span className="text-xs text-gray-400">· {article.source}</span>}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">{article.title}</h1>

        {article.summary && (
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 border-l-4 border-[#00d4aa] pl-4">
            {article.summary}
          </p>
        )}

        {article.body ? (
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.body }} />
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 text-center text-gray-500">
            <p className="mb-4">Full article content available with AIME.</p>
            <Link href="/aime" className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors">
              Try AIME Free →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
