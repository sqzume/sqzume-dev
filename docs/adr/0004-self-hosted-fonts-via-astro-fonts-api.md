# フォントは Astro Fonts API で自己ホストし、和文は google プロバイダで分割配信する

フォントはすべて Astro 7 の Fonts API 経由で `sqzume.dev` から配信し、訪問者のブラウザが第三者ドメインに接続しない構成にした。
和文の Zen Kaku Gothic New は `google` プロバイダで取得する。
`fontsource` プロバイダでは `unicode-range` による分割が失われ、1 ウェイトあたり約 1 MB の一体型ファイルになることを実測で確認したため。

## 構成

- **CommitMono NL**（英数字・UI ラベル・コード）: 本人のカスタムビルドを `src/assets/fonts/` に置き、`local` プロバイダで配信する。
  元ファイルは `~/commitmono-metadata-fix/fonts-nl/` の OTF（RIBBI の 4 つ）を woff2 に変換したもの。
  バイナリが名乗るライセンスは SIL OFL 1.1 なので、`openfontlicense.org` の全文を `LICENSE-CommitMono.txt` として同梱している。
  GitHub リポジトリの MIT はツール側のライセンスで、フォントには当たらない。
- **Zen Kaku Gothic New**（見出し 700・本文 400）: `google` プロバイダで取得し、`subsets: ["japanese", "latin"]` を指定する。
  `subsets` は既定の `["latin"]` のままだと取得対象そのものが欧文に絞られ、和文がシステムフォントに落ちる。
- **フォールバックの順序**は `tokens.css` の `--font-mono` で一括管理する。
  CommitMono 側の `fallbacks` を `[]` にしているのは、汎用の `monospace` が Zen Kaku Gothic New より先に来て、和文字を横取りするのを防ぐため。

## Considered Options

- **Google Fonts を CDN から直接読む**: 訪問者の IP が Google に送られる。Cookie 不要の Web Analytics を選んだ判断と矛盾する。
- **`fontsource` プロバイダ**: 分割が失われ、日本語を含むページで約 2.3 MB を毎回取得することになる。
- **フォントの全体ファイルをリポジトリに置く**: 上と同じく約 2.3 MB になり、git 履歴にも 3 MB 超の差分を残せないバイナリが残る。

## Consequences

- 1 ページあたりの転送量は、和文の量に応じて約 120〜500 KB。和文の書体をサイトの見た目の軸として選んだ対価として許容している。
- 和文フォントのウェイトを 1 つ増やすと、全ページの HTML にインライン展開される `@font-face` が約 121 個増える。ウェイトは 400 と 700 に限る。
- `<Font>` コンポーネントに `preload` を付けると、使われない斜体や太字まで強制的に取得される。付けない。
- `/_astro/*` はファイル名にハッシュが付いた不変ファイルなので、`public/_headers` で `immutable` の 1 年キャッシュにしている。
