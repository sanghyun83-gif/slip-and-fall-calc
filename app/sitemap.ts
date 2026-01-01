import { MetadataRoute } from 'next'
import { SITE, CALCULATORS } from './site-config'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE.baseUrl;
    const currentDate = new Date().toISOString();

    const routes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        ...CALCULATORS.map((calc) => ({
            url: `${baseUrl}/${calc.id}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: calc.featured ? 0.9 : 0.7,
        })),
    ];

    return routes;
}
