import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-bold text-[#00d4aa] mb-4">404</div>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="flex gap-3">
        <Link href="/" className="bg-[#00d4aa] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#00bfa0] transition-colors">
          Go Home
        </Link>
        <Link href="/news" className="border border-gray-200 dark:border-gray-700 px-6 py-2.5 rounded-full hover:border-[#00d4aa] transition-colors">
          Read News
        </Link>
      </div>
    </div>
  );
}
