import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VivaahInvites - Dynamic Wedding Invitation Management Platform',
  description:
    'Create, manage and publish beautiful dynamic Indian wedding invitations with personalized URLs, live countdowns, music and photo galleries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200">
        {children}
      </body>
    </html>
  );
}
