import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 3600;

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

const categoryLabels: Record<string, string> = {
  "investing-101": "Investing 101",
  "technical-analysis-101": "Technical Analysis 101",
  "fundamental-101": "Fundamental Analysis 101",
  "ainvest-front-line": "AInvest Front Line",
};

const categoryHrefs: Record<string, string> = {
  "investing-101": "/learn/stocks/investing-101",
  "technical-analysis-101": "/learn/stocks/technical-analysis-101",
  "fundamental-101": "/learn/stocks/fundamental-101",
  "ainvest-front-line": "/learn/features/ainvest-front-line",
};

export async function generateStaticParams() {
  const { data } = await supabase.from("blog_posts").select("slug");
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from("blog_posts").select("title, excerpt").eq("slug", slug).single();
  const p = data as Pick<BlogPost, "title" | "excerpt"> | null;
  return {
    title: p ? `${p.title} | AInvest Learn` : "Learn | AInvest",
    description: p?.excerpt ?? undefined,
    openGraph: { type: "article", title: p?.title ?? "AInvest Learn" },
  };
}

export default async function LearnPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
  const post = data as BlogPost | null;

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: "AInvest" },
    publisher: { "@type": "Organization", name: "AInvest" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/learn" className="hover:text-[#00d4aa]">Learn</Link>
          <span>›</span>
          <Link href={categoryHrefs[post.category] ?? "/learn"} className="hover:text-[#00d4aa]">
            {categoryLabels[post.category] ?? post.category}
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>

        {post.published_at && (
          <p className="text-sm text-gray-400 mb-6">
            {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}

        {post.excerpt && (
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 border-l-4 border-[#00d4aa] pl-4">
            {post.excerpt}
          </p>
        )}

        {post.body ? (
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.body }} />
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 text-center text-gray-500">
            <p className="mb-2 font-medium">Full article coming soon.</p>
            <p className="text-sm mb-4">Ask AIME to explain this topic in depth.</p>
            <Link href="/aime/agent" className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors">
              Ask AIME →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
