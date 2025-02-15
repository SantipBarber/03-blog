import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request, site }) => {

  const blogPosts = await getCollection('blog');


  return rss({
    // stylesheet: '/styles/rss.xsl',
    title: 'SpBarber’s Blog',
    description: 'Un simple blog de ejemplo con Astro',
    site: site ?? 'https://spbarber.com',
    items: blogPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.slug}`,
      image: post.data.image
    })),
    customData: `<language>es-es</language>`,
  });
}