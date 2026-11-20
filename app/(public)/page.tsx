import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, Shield, CheckCircle, ExternalLink, ArrowRight, Layers, Palette } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#242424] font-sans selection:bg-[#D4AF37]/30 selection:text-[#800020]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EAE4DC] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-[#800020] text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </span>
            <span className="text-xl font-serif font-bold tracking-tight text-[#242424]">
              Vivaah<span className="text-[#800020]">Invites</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/wedding/aarav-weds-priya"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#777777] hover:text-[#800020] transition-colors"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>

            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/50 text-[#800020] text-xs font-semibold mb-6 shadow-2xs">
          <Heart className="w-3.5 h-3.5 fill-[#800020]" />
          <span>Dynamic Wedding Invitation Management Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#242424] mb-6 leading-tight">
          Create Majestic Digital Invitations with <span className="text-[#800020]">Dedicated Slugs</span>
        </h1>

        <p className="text-base sm:text-lg text-[#777777] max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Manage multiple weddings with personalized templates, dynamic countdowns, photo galleries, background music, event itineraries, and real-time MongoDB data.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/wedding/aarav-weds-priya"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#800020] hover:bg-[#580016] text-white font-serif font-semibold shadow-lg shadow-[#800020]/25 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Explore Demo Invitation</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>

          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FAF8F5] text-[#242424] font-semibold text-xs border border-[#EAE4DC] shadow-xs transition-all cursor-pointer"
          >
            <Shield className="w-4 h-4 text-[#800020]" />
            <span>Open Admin Dashboard</span>
          </Link>
        </div>
      </section>

      {/* Showcase Demo Card */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EAE4DC] bg-white p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]">
                Featured Invitation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-2 mb-3">
                Aarav Sharma &amp; Priya Patel
              </h2>
              <p className="text-sm text-[#777777] leading-relaxed mb-5">
                Experience our Royal Indian Wedding template with animated envelope reveal, traditional shlok, countdown, Haldi &amp; Mehndi schedules, photo lightbox, and Shehnai background audio.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#777777] bg-[#FAF8F5] border border-[#EAE4DC] px-3.5 py-2.5 rounded-xl mb-6">
                <span className="text-[#800020] font-semibold">URL:</span>
                <span>/wedding/aarav-weds-priya</span>
              </div>
              <Link
                href="/wedding/aarav-weds-priya"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-xs font-semibold shadow-xs transition-all"
              >
                <span>View Full Invitation</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>

            <div className="relative w-full md:w-80 h-96 rounded-2xl overflow-hidden shadow-inner border border-[#EAE4DC]">
              <Image
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                alt="Aarav and Priya Wedding"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Royal Orchid Palace
                </span>
                <p className="text-lg font-serif font-bold">14 February 2027</p>
                <p className="text-xs text-stone-300">Ahmedabad, Gujarat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#242424]">Platform Architecture &amp; Features</h2>
          <p className="text-sm text-[#777777] mt-2">Designed for elegance, built for performance</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs">
            <span className="p-3 rounded-2xl bg-[#800020]/10 text-[#800020] inline-block mb-4">
              <Layers className="w-6 h-6" />
            </span>
            <h3 className="text-lg font-bold text-[#242424] mb-2 font-serif">Dynamic Multi-Wedding Slugs</h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Every couple receives an exclusive URL slug fetched dynamically from MongoDB Atlas with full SEO metadata and Open Graph social sharing.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs">
            <span className="p-3 rounded-2xl bg-[#D4AF37]/20 text-[#800020] inline-block mb-4">
              <Palette className="w-6 h-6" />
            </span>
            <h3 className="text-lg font-bold text-[#242424] mb-2 font-serif">3 Reusable Templates</h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Switch seamlessly between Royal Indian Wedding, Floral Elegant Wedding, and Modern Minimal Wedding designs without altering wedding data.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs">
            <span className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 inline-block mb-4">
              <Shield className="w-6 h-6" />
            </span>
            <h3 className="text-lg font-bold text-[#242424] mb-2 font-serif">Secure Admin Dashboard</h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Protected authentication with HTTP-only cookies, password hashing with bcrypt, multi-step creation wizard, search, and one-click publishing.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#EAE4DC] text-center text-xs text-[#777777] bg-white">
        <p>© 2027 VivaahInvites Platform. Built with Next.js App Router, Tailwind CSS, and MongoDB.</p>
      </footer>
    </div>
  );
}
