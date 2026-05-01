import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "News", href: "/news" },
    { label: "Market", href: "/market" },
    { label: "Screener", href: "/screener" },
    { label: "AIME AI", href: "/aime" },
    { label: "Magic Portfolio", href: "/store/magic-portfolio" },
  ],
  Learn: [
    { label: "Investing 101", href: "/learn/stocks/investing-101" },
    { label: "Technical Analysis", href: "/learn/stocks/technical-analysis-101" },
    { label: "Fundamentals", href: "/learn/stocks/fundamental-101" },
    { label: "Front Line Blog", href: "/learn/features/ainvest-front-line" },
  ],
  Company: [
    { label: "About AIME", href: "/aime/about" },
    { label: "Dashboard", href: "/aime/dashboard" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="text-[#00d4aa] font-bold text-xl mb-3">AInvest</div>
          <p className="text-sm leading-relaxed">
            AI-powered stock analysis, real-time market news &amp; predictive tools for smarter trades.
          </p>
        </div>
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <div className="text-white font-semibold mb-3 text-sm">{section}</div>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 text-center text-xs py-4 text-gray-600">
        © {new Date().getFullYear()} AInvest. All rights reserved.
      </div>
    </footer>
  );
}
