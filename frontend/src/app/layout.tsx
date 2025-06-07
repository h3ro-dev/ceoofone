import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ceoofone.ai'),
  title: 'CEO of One - AI-Powered Chief of Staff for Solo CEOs',
  description:
    "Stop drowning in the 80% that doesn't matter. CEO of One is your AI-powered chief of staff that helps solo CEOs focus on the critical 20% that drives results.",
  keywords: [
    'solo CEO',
    'one-person business',
    'CEO productivity',
    'AI chief of staff',
    'business focus',
    'executive assistant AI',
  ],
  authors: [{ name: 'Utlyze' }],
  creator: 'Utlyze',
  publisher: 'Utlyze',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ceoofone.ai',
    siteName: 'CEO of One',
    title: 'CEO of One - AI-Powered Chief of Staff for Solo CEOs',
    description:
      "Stop drowning in the 80% that doesn't matter. Focus on what truly drives your business forward.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CEO of One - Your AI Chief of Staff',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEO of One - AI-Powered Chief of Staff',
    description:
      "Stop drowning in the 80% that doesn't matter. Focus on what truly drives your business forward.",
    images: ['/twitter-image.png'],
    creator: '@utlyze',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4169E1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
