import Link from 'next/link';
import { HeartCrack, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md w-full text-center p-8 sm:p-12 bg-white rounded-3xl shadow-xl border border-stone-200">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
          <HeartCrack className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Invitation Not Found</h1>
        <p className="text-stone-600 text-sm mb-6 leading-relaxed">
          The wedding invitation you are looking for either does not exist, has expired, or is currently waiting to be published by the host.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            href="/wedding/aarav-weds-priya"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Demo Invitation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
