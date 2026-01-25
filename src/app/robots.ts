import { MetadataRoute } from 'next';

const BASE_URL = 'https://tuwebideal.unixxtech.online'; 

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
