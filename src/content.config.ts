import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 記事。Markdown ファイル 1 つ = 1 記事。
// 画像を伴う記事は `my-post/index.md` としてフォルダを作り、画像を同じ場所に置く。
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // 一覧の抜粋と OGP に使うため必須。本文の書き出し任せにしない。
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // 記事の唯一の分類軸。階層は持たない。
      tags: z.array(z.string()).default([]),
      // true の記事は本番ビルドから除外され、開発サーバでのみ見える。
      draft: z.boolean().default(false),
      // カードに載せる見出し画像。記事と同じフォルダに置き、相対パスで指定する。
      // 無い記事は OGP 画像で代替する。
      cover: image().optional(),
    }),
});

export const collections = { blog };
