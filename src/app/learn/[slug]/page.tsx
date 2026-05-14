import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

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

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post ? `${post.title} | AInvest Learn` : "Learn | AInvest",
    description: post?.excerpt ?? undefined,
    openGraph: { type: "article", title: post?.title ?? "AInvest Learn" },
  };
}

export default async function LearnPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
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

        <p className="text-sm text-gray-400 mb-6">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 border-l-4 border-[#00d4aa] pl-4">
          {post.excerpt}
        </p>

        <div className="prose dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
          prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-strong:text-gray-900 dark:prose-strong:text-white
          prose-a:text-[#00d4aa] prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center">
          <p className="font-semibold mb-2">Want AI-powered stock analysis?</p>
          <p className="text-sm text-gray-500 mb-4">Ask AIME anything about investing, markets, or specific stocks.</p>
          <Link href="/aime/agent" className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors">
            Ask AIME →
          </Link>
        </div>
      </div>
    </>
  );
}
