import { getCollection, type CollectionEntry } from "astro:content";

/**
 * 公開対象の記事を新しい順に返す。
 * draft: true の記事は本番ビルドでのみ除外し、開発サーバでは見える。
 */
export async function getPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
