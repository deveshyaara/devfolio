import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://devesh.co.in/',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://devesh.co.in/resume',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
