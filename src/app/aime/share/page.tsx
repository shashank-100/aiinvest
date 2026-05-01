import type { Metadata } from "next";

export const metadata: Metadata = { title: "Share Analysis | AInvest AIME", description: "Share your AIME analyses and insights with others." };

export default function SharePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Share Analysis</h1>
      <p className="text-gray-500 mb-10">Share your AIME analyses, stock picks, and insights with your network.</p>
      <div className="bg-black text-white rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">📤</div>
        <h2 className="text-xl font-bold mb-3">Share Your Insights</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
          Run an analysis with AIME, then share it as a link. Your recipients see the full AI analysis — no account required to view.
        </p>
        <button className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors">
          Start an Analysis →
        </button>
      </div>
    </div>
  );
}
