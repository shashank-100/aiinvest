import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Top Gainers | AInvest Market",
  description: "Today's top gaining stocks — biggest price increases in the US market.",
};

const placeholder = [
  { ticker: "NVDA", name: "NVIDIA Corporation", change: "+8.4%", price: "$924.10", sector: "Information Technology" },
  { ticker: "META", name: "Meta Platforms", change: "+5.2%", price: "$512.30", sector: "Communication Services" },
  { ticker: "TSLA", name: "Tesla Inc", change: "+4.8%", price: "$248.50", sector: "Consumer Discretionary" },
  { ticker: "AMD", name: "Advanced Micro Devices", change: "+4.1%", price: "$178.20", sector: "Information Technology" },
  { ticker: "AMZN", name: "Amazon.com Inc", change: "+3.7%", price: "$192.40", sector: "Consumer Discretionary" },
];

export default function TopGainersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <Link href="/market" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← Market</Link>
      <h1 className="text-3xl font-bold mb-2">Top Gainers</h1>
      <p className="text-gray-500 mb-8">Today&apos;s biggest price increases in the US stock market.</p>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Stock</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Price</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Change</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium hidden md:table-cell">Sector</th>
            </tr>
          </thead>
          <tbody>
            {placeholder.map((s) => (
              <tr key={s.ticker} className="border-b border-gray-50 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold">{s.ticker}</div>
                  <div className="text-xs text-gray-500">{s.name}</div>
                </td>
                <td className="py-3 px-4 text-right font-medium">{s.price}</td>
                <td className="py-3 px-4 text-right font-bold text-green-500">{s.change}</td>
                <td className="py-3 px-4 text-right text-gray-500 hidden md:table-cell text-xs">{s.sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Live data available with a market data provider integration.</p>
    </div>
  );
}
