import type { Metadata } from "next";

export const metadata: Metadata = { title: "AIME Memory | AInvest", description: "AIME remembers your preferences, watchlists, and past conversations." };

export default function MemoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">AIME Memory</h1>
      <p className="text-gray-500 mb-10">AIME remembers your preferences, risk tolerance, watchlists, and past conversations — so every session gets smarter.</p>
      <div className="space-y-4">
        {[
          { icon: "⚡", title: "Risk Tolerance", desc: "AIME learns whether you prefer growth, value, or income investing." },
          { icon: "👁️", title: "Watchlists", desc: "Stocks you follow are remembered and tracked automatically." },
          { icon: "💬", title: "Past Conversations", desc: "AIME recalls previous analyses so you never repeat yourself." },
          { icon: "🎯", title: "Investment Goals", desc: "Retirement, growth, passive income — AIME tailors advice to your goals." },
        ].map((item) => (
          <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex gap-4">
            <span className="text-3xl">{item.icon}</span>
            <div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
