import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "AI Screener | AInvest", description: "Let AIME filter stocks based on your goals and risk tolerance." };

const examples = [
  "Find me undervalued tech stocks with strong earnings",
  "Show S&P 500 stocks with RSI below 30",
  "What small caps have beaten earnings 3 quarters in a row?",
  "Find dividend stocks with yield above 4% and low payout ratio",
];

export default function AimeScreenerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">AI Screener</h1>
      <p className="text-gray-500 mb-8">Describe what you&apos;re looking for in plain English — AIME finds the stocks.</p>

      <div className="flex gap-2 mb-6">
        <input type="text" placeholder="Find me undervalued tech stocks..."
          className="flex-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#00d4aa]" />
        <button className="bg-[#00d4aa] text-black font-semibold px-5 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors text-sm">
          Screen →
        </button>
      </div>

      <h2 className="text-sm font-semibold text-gray-500 mb-3">Try these</h2>
      <div className="space-y-2 mb-8">
        {examples.map((e) => (
          <button key={e} className="w-full text-left text-sm bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors">
            {e}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">
        Or browse <Link href="/screener" className="text-[#00d4aa] hover:underline">pre-built screeners →</Link>
      </p>
    </div>
  );
}
