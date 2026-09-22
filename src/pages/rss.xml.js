import rss from "@astrojs/rss";
import { getPosts } from "../lib/posts";

export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: "sqzume.dev",
    description: "sqzume の個人サイト。日頃やっていることを書いています。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: "<language>ja</language>",
  });
}
