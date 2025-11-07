import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://taxcat.ca';
  
  // Static pages
  const routes = [
    '',
    '/calculators',
    '/calculators/tax-bracket',
    '/calculators/hst-gst',
    '/calculators/tfsa',
    '/calculators/cpp-ei',
    '/calculators/marginal-rate',
    '/calculators/refund-estimator',
    '/mock-return',
    '/mock-return/wizard',
    '/faq',
    '/glossary',
    '/learn',
    '/about',
    '/contact'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.includes('calculator') ? 0.9 : 0.8
  }));

  return routes;
}