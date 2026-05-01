import type { Metadata } from "next";

export const metadata: Metadata = { title: "Market Data | AInvest AIME", description: "Deep financial data, filings, and historical metrics powered by AIME." };

const dataSources = [
  { icon: "📋", title: "SEC Filings", desc: "10-K, 10-Q, 8-K filings with AI summaries" },
  { icon: "📊", title: "Financials", desc: "Income statements, balance sheets, cash flows" },
  { icon: "📈", title: "Historical Prices", desc: "OHLCV data going back decades" },
  { icon: "🧮", title: "Key Metrics", desc: "P/E, P/B, EV/EBITDA, margins and more" },
  { icon: "🏦", title: "Institutional Holdings", desc: "13F filings and ownership changes" },
  { icon: "📅", title: "Earnings Calendar", desc: "Upcoming and historical earnings dates" },
];

export default function DataPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Market Data</h1>
      <p className="text-gray-500 mb-10">Deep financial data, filings, and historical metrics — all searchable through AIME.</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dataSources.map((d) => (
          <div key={d.title} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#00d4aa] transition-colors">
            <div className="text-3xl mb-3">{d.icon}</div>
            <h3 className="font-bold mb-1">{d.title}</h3>
            <p className="text-sm text-gray-500">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
