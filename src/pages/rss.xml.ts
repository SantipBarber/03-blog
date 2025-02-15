import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ params, request, site }) => {

  const blogPosts = await getCollection('blog');


  return rss({
    // stylesheet: '/styles/rss.xsl',
    title: 'SpBarber’s Blog',
    description: 'Un simple blog de ejemplo con Astro',
    site: site ?? 'https://spbarber.com',
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
    items: blogPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.slug}`,
      image: post.data.image,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
      
      customData: `<media:content
          type="image/${post.data.image.format === 'jpg' ? 'jpeg' : 'png'}"
          width="${post.data.image.width}"
          height="${post.data.image.height}"
          medium="image"
          url="${site + post.data.image.src}" />
      `,
    })),


    customData: `<language>es-es</language>`,
  });
}