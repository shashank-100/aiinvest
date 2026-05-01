import Link from "next/link";

const marketSummary = [
  { name: "S&P 500", value: "5,611", change: "+0.32%", up: true },
  { name: "NASDAQ", value: "17,843", change: "+0.51%", up: true },
  { name: "DOW", value: "41,218", change: "-0.12%", up: false },
  { name: "BTC", value: "$94,210", change: "+1.8%", up: true },
];

const features = [
  {
    icon: "🤖",
    title: "AIME AI Advisor",
    desc: "Ask AIME anything about stocks. Get AI-powered analysis, chart reading, and personalized investment insights.",
    href: "/aime",
    cta: "Talk to AIME",
  },
  {
    icon: "📊",
    title: "Advanced Screener",
    desc: "Filter 33,000+ stocks by technical signals, fundamentals, sector, and more. Find your next trade.",
    href: "/screener",
    cta: "Open Screener",
  },
  {
    icon: "📰",
    title: "Market News",
    desc: "Real-time news, earnings, macro insights — all summarized by AI so you never miss a market move.",
    href: "/news",
    cta: "Read News",
  },
  {
    icon: "🧠",
    title: "Backtest Strategies",
    desc: "Test your ideas against years of market data. Win rates, max gains, worst drawdowns — all in seconds.",
    href: "/aime/backtest",
    cta: "Start Backtesting",
  },
];

const portfolioStyles = [
  { label: "Large Cap Growth", slug: "large-cap-growth" },
  { label: "Small Cap Growth", slug: "small-cap-growth" },
  { label: "Large Cap Value", slug: "large-cap-value" },
  { label: "Small Cap Value", slug: "small-cap-value" },
  { label: "Mid Cap Blend", slug: "mid-cap-blend" },
  { label: "Mid Cap Growth", slug: "mid-cap-growth" },
  { label: "Large Cap Blend", slug: "large-cap-blend" },
  { label: "Small Cap Blend", slug: "small-cap-blend" },
  { label: "Mid Cap Value", slug: "mid-cap-value" },
];

export default function HomePage() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="bg-black text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block bg-[#00d4aa]/20 text-[#00d4aa] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            3-Day Free Trial
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Your Financial World,{" "}
            <span className="text-[#00d4aa]">in One Intelligent Place</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            AI-powered stock analysis, real-time market news &amp; predictive tools for smarter
            trades. Start free with AInvest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/aime"
              className="bg-[#00d4aa] text-black font-bold px-8 py-3 rounded-full hover:bg-[#00bfa0] transition-colors text-lg"
            >
              Get Your Private Advisor →
            </Link>
            <Link
              href="/screener"
              className="border border-gray-600 text-white px-8 py-3 rounded-full hover:border-gray-400 transition-colors text-lg"
            >
              Explore Screener
            </Link>
          </div>
        </div>
      </section>

      {/* Market ticker */}
      <section className="bg-gray-950 text-white border-b border-gray-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto">
          {marketSummary.map((m) => (
            <div key={m.name} className="flex items-center gap-2 whitespace-nowrap text-sm">
              <span className="text-gray-400">{m.name}</span>
              <span className="font-semibold">{m.value}</span>
              <span className={m.up ? "text-green-400" : "text-red-400"}>{m.change}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">
            Understand What Moves the Market
          </h2>
          <p className="text-center text-gray-500 mb-12">
            From inflation to commodities to interest rates — see how everything connects.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-[#00d4aa] transition-colors"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{f.desc}</p>
                <Link href={f.href} className="text-[#00d4aa] text-sm font-semibold hover:underline">
                  {f.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magic Portfolios */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Magic Portfolios</h2>
            <p className="text-gray-500">
              AI-curated portfolios across every style. Pick your strategy and invest smarter.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {portfolioStyles.map((p) => (
              <Link
                key={p.slug}
                href={`/store/magic-portfolio/${p.slug}`}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center text-sm font-medium hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/store/magic-portfolio" className="text-[#00d4aa] font-semibold hover:underline">
              View All Magic Portfolios →
            </Link>
          </div>
        </div>
      </section>

      {/* AIME CTA */}
      <section className="py-20 px-4 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Run the Backtest With AI Precision
          </h2>
          <p className="text-gray-400 mb-8">
            Turn past reactions into smarter trades today. AIME digs into years of market data —
            win rates, max gains, and worst-case drawdowns. Want to test a custom strategy? Just ask
            AIME.
          </p>
          <Link
            href="/aime/backtest"
            className="bg-[#00d4aa] text-black font-bold px-8 py-3 rounded-full hover:bg-[#00bfa0] transition-colors"
          >
            Start Backtesting →
          </Link>
        </div>
      </section>
    </div>
  );
}
