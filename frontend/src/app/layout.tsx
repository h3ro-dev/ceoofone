import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BookingProvider } from '@/contexts/BookingContext';
import { AnalyticsProvider } from '@/contexts/AnalyticsContext';
import BookingModal from '@/components/BookingModal';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CookieConsent } from '@/components/analytics/CookieConsent';
import { WebVitals } from '@/components/analytics/WebVitals';
import { StructuredData, organizationSchema, websiteSchema } from '@/components/StructuredData';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ceo-of-one.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'CEO of One - AI-Powered Leverage for Solo Leaders',
    template: '%s | CEO of One',
  },
  description: 'Turn overwhelm into focus and results. CEO of One gives solo leaders the leverage of a full executive team through AI-powered support that identifies what matters and handles what doesn\'t.',
  keywords: 'AI CEO assistant, solo CEO tools, one person business management, executive assistant AI, business automation, strategic focus, productivity for CEOs',
  authors: [{ name: 'CEO of One' }],
  creator: 'CEO of One',
  publisher: 'CEO of One',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'CEO of One - Focus on the 20% That Actually Grows Your Business',
    description: 'Escape the 80% busywork and double down on strategic decisions. AI-powered leverage for solo leaders.',
    type: 'website',
    url: baseUrl,
    siteName: 'CEO of One',
    locale: 'en_US',
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
    images: ['/og-image.png'],
    creator: '@ceofone',
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
  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans antialiased bg-white text-neutral-charcoal">
        <AnalyticsProvider>
          <BookingProvider>
            {children}
            <BookingModal />
            <CookieConsent />
          </BookingProvider>
        </AnalyticsProvider>
        <GoogleAnalytics />
        <WebVitals />
      </body>
    </html>
  );
}
