import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinvest.vercel.app";

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];
type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
type PortfolioRow = Database["public"]["Tables"]["magic_portfolios"]["Row"];
type ScreenerRow = Database["public"]["Tables"]["screener_presets"]["Row"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/news`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE}/market`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/screener`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/aime`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/store/magic-portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const [{ data: articlesRaw }, { data: postsRaw }, { data: portfoliosRaw }, { data: screenersRaw }] =
    await Promise.all([
      supabase.from("articles").select("slug, published_at"),
      supabase.from("blog_posts").select("slug, published_at"),
      supabase.from("magic_portfolios").select("slug, created_at"),
      supabase.from("screener_presets").select("slug, created_at"),
    ]);

  const articles = (articlesRaw ?? []) as Pick<ArticleRow, "slug" | "published_at">[];
  const posts = (postsRaw ?? []) as Pick<BlogPostRow, "slug" | "published_at">[];
  const portfolios = (portfoliosRaw ?? []) as Pick<PortfolioRow, "slug" | "created_at">[];
  const screeners = (screenersRaw ?? []) as Pick<ScreenerRow, "slug" | "created_at">[];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/learn/${p.slug}`,
    lastModified: p.published_at ? new Date(p.published_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolios.map((p) => ({
    url: `${BASE}/store/magic-portfolio/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const screenerRoutes: MetadataRoute.Sitemap = screeners.map((s) => ({
    url: `${BASE}/screener/${s.slug}`,
    lastModified: new Date(s.created_at),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...articleRoutes, ...postRoutes, ...portfolioRoutes, ...screenerRoutes];
}
