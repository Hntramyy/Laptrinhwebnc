import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://techstore.vn'),
  title: {
    default: 'TechStore - Thiết Bị & Phụ Kiện Công Nghệ Chính Hãng',
    template: '%s | TechStore',
  },
  description: 'Hệ thống phân phối bàn phím cơ, chuột công thái học, màn hình đồ họa và phụ kiện công nghệ cao cấp chính hãng.',
  authors: [{ name: 'TechStore Vietnam' }],
  keywords: ['bàn phím cơ', 'chuột công thái học', 'tai nghe chống ồn', 'màn hình 2K', 'TechStore', 'Next.js', 'NextAuth'],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://techstore.vn',
    siteName: 'TechStore Vietnam',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <Suspense fallback={<header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}