import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export type Category = "investing-101" | "technical-analysis-101" | "fundamental-101" | "ainvest-front-line";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return { slug, title: data.title, excerpt: data.excerpt, category: data.category, date: data.date } as BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return { slug, title: data.title, excerpt: data.excerpt, category: data.category, date: data.date, content } as BlogPost;
  } catch {
    return null;
  }
}

export function getPostsByCategory(category: Category): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}
