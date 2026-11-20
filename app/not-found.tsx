import Link from 'next/link';
import { HeartCrack, ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <div className="max-w-md w-full text-center p-8 sm:p-12 bg-white rounded-3xl shadow-xl border border-[#EAE4DC]">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#800020]/10 flex items-center justify-center text-[#800020]">
          <HeartCrack className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#242424] mb-2">Invitation Not Found</h1>
        <p className="text-[#777777] text-xs sm:text-sm mb-6 leading-relaxed">
          The wedding invitation you are looking for either does not exist, has expired, or is currently waiting to be published by the host.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            href="/wedding/aarav-weds-priya"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] hover:bg-white text-[#242424] text-xs font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>View Demo Invitation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
