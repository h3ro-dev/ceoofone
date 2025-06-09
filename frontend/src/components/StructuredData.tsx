import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Organization schema for the website
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CEO of One',
  description: 'AI-Powered Leverage for Solo Leaders',
  url: 'https://ceo-of-one.vercel.app',
  logo: 'https://ceo-of-one.vercel.app/logo.svg',
  sameAs: [
    // Add social media URLs when available
  ],
};

// WebSite schema with search
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CEO of One',
  description: 'AI-Powered Leverage for Solo Leaders',
  url: 'https://ceo-of-one.vercel.app',
};

// Service schema
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CEO of One AI Assistant',
  description: 'AI-powered executive assistant that helps solo leaders focus on strategic decisions',
  provider: {
    '@type': 'Organization',
    name: 'CEO of One',
  },
  serviceType: 'AI Business Assistant',
  areaServed: {
    '@type': 'Country',
    name: 'Worldwide',
  },
};