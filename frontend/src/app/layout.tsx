import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BookingProvider } from '@/contexts/BookingContext';
import BookingModal from '@/components/BookingModal';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CEO of One - AI-Powered Leverage for Solo Leaders | Focus on What Matters',
  description: 'Turn overwhelm into focus and results. CEO of One gives solo leaders the leverage of a full executive team through AI-powered support that identifies what matters and handles what doesn\'t.',
  keywords: 'AI CEO assistant, solo CEO tools, one person business management, executive assistant AI, business automation, strategic focus, productivity for CEOs',
  openGraph: {
    title: 'CEO of One - Focus on the 20% That Actually Grows Your Business',
    description: 'Escape the 80% busywork and double down on strategic decisions. AI-powered leverage for solo leaders.',
    type: 'website',
    url: 'https://ceo-of-one.vercel.app',
    siteName: 'CEO of One',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CEO of One - AI-Powered Leverage for Solo Leaders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEO of One - AI-Powered Leverage for Solo Leaders',
    description: 'Turn overwhelm into focus. Get the leverage of a full executive team through AI.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-neutral-charcoal">
        <BookingProvider>
          {children}
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
