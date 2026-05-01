import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Backtest with AIME | AInvest",
  description: "Test trading strategies against years of market data. Win rates, max gains, drawdowns.",
};

const examples = [
  { event: "Earnings Beat", win_rate: "67%", avg_gain: "+4.2%", max_loss: "-8.1%" },
  { event: "FOMC Rate Hold", win_rate: "54%", avg_gain: "+1.8%", max_loss: "-3.2%" },
  { event: "CPI Below Estimate", win_rate: "71%", avg_gain: "+2.9%", max_loss: "-4.5%" },
  { event: "52-Week High Breakout", win_rate: "62%", avg_gain: "+6.7%", max_loss: "-9.3%" },
];

export default function BacktestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Backtest With AI Precision</h1>
      <p className="text-gray-500 mb-10">
        Turn past market reactions into smarter trades today. AIME groups similar events — earnings,
        FOMC, CPI — and calculates win rates, max gains, and worst-case drawdowns.
      </p>

      <div className="bg-black text-white rounded-2xl p-6 mb-8 text-center">
        <p className="text-gray-400 mb-3 text-sm">Ask AIME to backtest any strategy</p>
        <div className="bg-gray-900 rounded-xl p-3 flex items-center gap-3 max-w-md mx-auto border border-gray-700">
          <span className="text-gray-500 text-sm flex-1 text-left">
            &quot;What happens to AAPL after earnings beats?&quot;
          </span>
          <button className="bg-[#00d4aa] text-black text-sm font-semibold px-3 py-1 rounded-full">
            Run
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Example Backtests</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 text-gray-500 font-medium">Event Type</th>
              <th className="text-right py-3 text-gray-500 font-medium">Win Rate</th>
              <th className="text-right py-3 text-gray-500 font-medium">Avg Gain</th>
              <th className="text-right py-3 text-gray-500 font-medium">Max Loss</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((e) => (
              <tr key={e.event} className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-3 font-medium">{e.event}</td>
                <td className="py-3 text-right text-green-500">{e.win_rate}</td>
                <td className="py-3 text-right text-green-400">{e.avg_gain}</td>
                <td className="py-3 text-right text-red-400">{e.max_loss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/aime"
          className="bg-[#00d4aa] text-black font-bold px-8 py-3 rounded-full hover:bg-[#00bfa0] transition-colors"
        >
          Start Backtesting with AIME →
        </Link>
      </div>
    </div>
  );
}
