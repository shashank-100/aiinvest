export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: number;
          title: string;
          slug: string;
          summary: string | null;
          body: string | null;
          tag: string | null;
          source: string | null;
          published_at: string | null;
          cover_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["articles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
      };
      blog_posts: {
        Row: {
          id: number;
          title: string;
          slug: string;
          excerpt: string | null;
          body: string | null;
          category: "investing-101" | "technical-analysis-101" | "fundamental-101" | "ainvest-front-line";
          cover_url: string | null;
          published_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["blog_posts"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
      };
      screener_presets: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string | null;
          filters: Record<string, unknown> | null;
          featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["screener_presets"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["screener_presets"]["Insert"]>;
      };
      magic_portfolios: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string | null;
          style: string;
          holdings: string[] | null;
          ytd_return: number | null;
          risk_level: "low" | "medium" | "high" | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["magic_portfolios"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["magic_portfolios"]["Insert"]>;
      };
    };
  };
};
