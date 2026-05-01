import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIME — Your AI Investment Advisor | AInvest",
  description: "AIME is your personal AI investment advisor. Ask anything about stocks, get chart analysis, run backtests, and more.",
};

const aimeFeatures = [
  { icon: "💬", title: "Ask AIME", desc: "Natural language queries about any stock, sector, or macro event.", href: "/aime/agent" },
  { icon: "📊", title: "AI Charts", desc: "Automatic pattern recognition — AIME draws the lines and calls bullish or bearish.", href: "/aime/aicharts" },
  { icon: "🔬", title: "Backtest", desc: "Test strategies against years of market data. Win rates and drawdowns in seconds.", href: "/aime/backtest" },
  { icon: "🔍", title: "AI Screener", desc: "Let AIME filter stocks for you based on your goals and risk tolerance.", href: "/aime/screener" },
  { icon: "📁", title: "Portfolio", desc: "Track and manage your holdings with AI-powered recommendations.", href: "/aime/portfolio" },
  { icon: "🗄️", title: "Data", desc: "Access deep financial data, filings, and historical metrics.", href: "/aime/data" },
  { icon: "🧠", title: "Memory", desc: "AIME remembers your preferences, watchlists, and past conversations.", href: "/aime/memory" },
  { icon: "📤", title: "Share", desc: "Share your AIME analyses and insights with others.", href: "/aime/share" },
];

export default function AimePage() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="bg-black text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#00d4aa]/20 text-[#00d4aa] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            AI-Powered
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet <span className="text-[#00d4aa]">AIME</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Your private AI investment advisor. Ask about any stock, get chart analysis, run
            backtests, and build smarter portfolios — all in plain English.
          </p>
          <div className="bg-gray-900 rounded-2xl p-4 max-w-lg mx-auto mb-8 flex items-center gap-3 border border-gray-700">
            <span className="text-gray-500 text-sm flex-1 text-left">Ask me about NVDA...</span>
            <button className="bg-[#00d4aa] text-black text-sm font-semibold px-4 py-1.5 rounded-full">
              Ask →
            </button>
          </div>
          <Link
            href="/aime/agent"
            className="bg-[#00d4aa] text-black font-bold px-8 py-3 rounded-full hover:bg-[#00bfa0] transition-colors text-lg"
          >
            Reserve AimeClaw Access →
          </Link>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Everything AIME Can Do</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aimeFeatures.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#00d4aa] transition-colors group"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-1 group-hover:text-[#00d4aa] transition-colors">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
