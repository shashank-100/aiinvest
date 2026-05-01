import type { Metadata } from "next";

export const metadata: Metadata = { title: "AIME Agent | AInvest", description: "Chat with AIME — your AI investment advisor." };

const prompts = [
  "What's driving NVDA today?",
  "Is Apple a buy right now?",
  "Show me undervalued tech stocks",
  "Explain the Fed's latest decision",
  "What sectors are outperforming this month?",
  "Build me a recession-proof portfolio",
];

export default function AgentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Ask AIME</h1>
        <p className="text-gray-500">Your private AI investment advisor. Ask anything about stocks, markets, or strategy.</p>
      </div>

      <div className="bg-black rounded-2xl p-6 mb-6 min-h-[300px] flex flex-col justify-end">
        <div className="bg-gray-900 rounded-xl p-4 text-gray-400 text-sm mb-4">
          👋 Hi! I&apos;m AIME. Ask me about any stock, sector, or market event and I&apos;ll give you AI-powered analysis in seconds.
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ask me about NVDA..."
          className="flex-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#00d4aa]"
        />
        <button className="bg-[#00d4aa] text-black font-semibold px-5 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors text-sm">
          Ask →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {prompts.map((p) => (
          <button key={p}
            className="text-left text-xs bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
