import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard | AInvest", description: "Your all-in-one hub for smarter investing." };

const panels = [
  { icon: "📰", label: "World News", href: "/news" },
  { icon: "📊", label: "Earnings", href: "/news" },
  { icon: "🌐", label: "Macro Insights", href: "/market" },
  { icon: "💼", label: "Portfolio", href: "/aime/portfolio" },
  { icon: "🔍", label: "Screener", href: "/aime/screener" },
  { icon: "📈", label: "AI Charts", href: "/aime/aicharts" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-10">Your all-in-one hub for smarter investing. Stay ahead with world news, earnings, macro insights, and portfolio tracking.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {panels.map((p) => (
          <Link key={p.label} href={p.href}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#00d4aa] transition-colors group">
            <span className="text-4xl">{p.icon}</span>
            <span className="font-semibold group-hover:text-[#00d4aa] transition-colors">{p.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
