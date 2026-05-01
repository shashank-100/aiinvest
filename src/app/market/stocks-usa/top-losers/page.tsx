import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Top Losers | AInvest Market",
  description: "Today's biggest declining stocks in the US market.",
};

const placeholder = [
  { ticker: "PYPL", name: "PayPal Holdings", change: "-6.2%", price: "$62.40", sector: "Financials" },
  { ticker: "INTC", name: "Intel Corporation", change: "-4.8%", price: "$31.20", sector: "Information Technology" },
  { ticker: "PFE", name: "Pfizer Inc", change: "-3.9%", price: "$28.10", sector: "Health Care" },
  { ticker: "BA", name: "Boeing Company", change: "-3.4%", price: "$194.50", sector: "Industrials" },
  { ticker: "WBA", name: "Walgreens Boots Alliance", change: "-3.1%", price: "$18.20", sector: "Consumer Staples" },
];

export default function TopLosersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <Link href="/market" className="text-sm text-gray-500 hover:text-[#00d4aa] mb-6 inline-block">← Market</Link>
      <h1 className="text-3xl font-bold mb-2">Top Losers</h1>
      <p className="text-gray-500 mb-8">Today&apos;s biggest decliners in the US stock market.</p>
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
                <td className="py-3 px-4 text-right font-bold text-red-500">{s.change}</td>
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
