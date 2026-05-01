import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trending Stocks | AInvest Market",
  description: "Most talked about and traded stocks right now.",
};

const placeholder = [
  { ticker: "NVDA", name: "NVIDIA Corporation", reason: "AI chip demand surge", change: "+8.4%" },
  { ticker: "TSLA", name: "Tesla Inc", reason: "Earnings beat + robotaxi news", change: "+4.8%" },
  { ticker: "AAPL", name: "Apple Inc", reason: "iPhone 17 pre-order data", change: "+2.1%" },
  { ticker: "META", name: "Meta Platforms", reason: "AI assistant monthly users hit 1B", change: "+5.2%" },
  { ticker: "GOOGL", name: "Alphabet Inc", reason: "Cloud revenue acceleration", change: "+3.3%" },
  { ticker: "AMZN", name: "Amazon.com", reason: "AWS growth re-acceleration", change: "+3.7%" },
];

export default function TrendingStocksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <Link href="/market" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← Market</Link>
      <h1 className="text-3xl font-bold mb-2">Trending Stocks</h1>
      <p className="text-gray-500 mb-8">Most talked about and actively traded stocks right now.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {placeholder.map((s, i) => (
          <div key={s.ticker} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#00d4aa] transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">#{i + 1}</span>
                  <span className="font-bold text-lg">{s.ticker}</span>
                </div>
                <div className="text-sm text-gray-500">{s.name}</div>
              </div>
              <span className={`font-bold text-sm ${s.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {s.change}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
              🔥 {s.reason}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-6 text-center">Live trending data available with AIME.</p>
    </div>
  );
}
