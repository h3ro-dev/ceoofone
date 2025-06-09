import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ceo-of-one.vercel.app';
  
  // Add all your routes here
  const routes = [
    '',
    '/analytics',
    // Add more routes as your app grows
  ];

  const sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return sitemap;
}