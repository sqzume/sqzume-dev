// @ts-check
import { defineConfig, fontProviders } from "astro/config";

const FONT_DIR = "./src/assets/fonts";

// https://astro.build/config
export default defineConfig({
  site: "https://sqzume.dev",

  fonts: [
    // 英数字と装飾。カスタムビルド（NL = リガチャなし）をリポジトリから配信する
    {
      provider: fontProviders.local(),
      name: "CommitMono NL",
      cssVariable: "--font-commit-mono",
      // 生成側の設定に合わせた字形。切ると別のフォントに見える
      featureSettings: '"ss01" 1, "ss02" 1, "ss04" 1, "ss05" 1, "calt" 1',
      fallbacks: ["ui-monospace", "monospace"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: [`${FONT_DIR}/CommitMonoNL-Regular.woff2`],
          },
          {
            weight: 400,
            style: "italic",
            src: [`${FONT_DIR}/CommitMonoNL-Italic.woff2`],
          },
          {
            weight: 700,
            style: "normal",
            src: [`${FONT_DIR}/CommitMonoNL-Bold.woff2`],
          },
          {
            weight: 700,
            style: "italic",
            src: [`${FONT_DIR}/CommitMonoNL-BoldItalic.woff2`],
          },
        ],
      },
    },

    // 和文の本文
    {
      provider: fontProviders.google(),
      name: "Zen Kaku Gothic New",
      cssVariable: "--font-zen-kaku",
      weights: [400, 700],
      styles: ["normal"],
      subsets: ["japanese", "latin"],
      fallbacks: ["Hiragino Kaku Gothic ProN", "Noto Sans CJK JP", "sans-serif"],
    },

    // 見出しの明朝
    {
      provider: fontProviders.google(),
      name: "Shippori Mincho",
      cssVariable: "--font-shippori",
      weights: [600],
      styles: ["normal"],
      subsets: ["japanese", "latin"],
      fallbacks: ["Hiragino Mincho ProN", "Noto Serif CJK JP", "serif"],
    },
  ],
});
