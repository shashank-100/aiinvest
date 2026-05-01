import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "AI Portfolio | AInvest", description: "Track and manage your portfolio with AI-powered recommendations." };

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">AI Portfolio</h1>
      <p className="text-gray-500 mb-10">Track your holdings and get AI-powered recommendations tailored to your goals.</p>
      <div className="bg-black text-white rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">💼</div>
        <h2 className="text-xl font-bold mb-3">Connect Your Portfolio</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
          Link your brokerage or manually add holdings. AIME will analyze your positions, identify risks, and suggest optimizations.
        </p>
        <Link href="/aime/agent"
          className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors">
          Get Started with AIME →
        </Link>
      </div>
    </div>
  );
}
