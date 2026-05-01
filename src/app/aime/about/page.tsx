import type { Metadata } from "next";

export const metadata: Metadata = { title: "About AIME | AInvest" };

export default function AimeAboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl font-bold mb-6">About AIME</h1>
      <p className="text-gray-500 text-lg leading-relaxed mb-6">
        AIME (AI Market Expert) is AInvest&apos;s proprietary AI investment advisor — built to give
        every investor access to institutional-grade analysis in plain English.
      </p>
      <p className="text-gray-500 leading-relaxed mb-6">
        Ask AIME about any stock, sector, or macro event. Get real-time chart pattern recognition,
        automated backtests, personalized screeners, and portfolio recommendations — all powered by
        the latest large language models and live market data.
      </p>
      <p className="text-gray-500 leading-relaxed">
        AIME remembers your preferences, learns your risk tolerance, and improves with every
        conversation. It&apos;s not just a chatbot — it&apos;s your private financial co-pilot.
      </p>
    </div>
  );
}
