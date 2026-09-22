# OGP 画像

SNS で共有されたときに表示されるカード画像。全ページ共通の 1 枚。

- 原本: `ogp.svg`
- 出力: `../../public/ogp.png`（1200×630）

## 再生成の手順

描画には次の 2 つのフォントが必要です。

- **CommitMono NL** … `src/assets/fonts/` にあるものと同じ（システムにインストール済みなら解決される）
- **Shippori Mincho SemiBold** … Google Fonts の原本
  `https://github.com/google/fonts/raw/main/ofl/shipporimincho/ShipporiMincho-SemiBold.ttf`

両方をフォントとして解決できる状態にしたうえで:

```
rsvg-convert -w 1200 -h 630 tools/ogp/ogp.svg -o public/ogp.png
```

色は `src/styles/tokens.css` の oklch 値を sRGB に変換した実値を直接書いています。
トークンの色を変えた場合は、この SVG の 16 進値も追随させてください。
