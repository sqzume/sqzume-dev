# sqzume.dev

sqzume の個人サイト（ブログとホーム）。Astro 7 の静的サイトを Cloudflare Workers（Static Assets）で配信している。

- 用語は [CONTEXT.md](CONTEXT.md) に従う（「ホーム」「記事」「タグ」など）。
- ホスティング・テーマ・URL・フォントを変える前に [docs/adr/](docs/adr/) の該当 ADR を読む。

## Git

- コミットメッセージは `<gitmoji> <日本語の要約>` の 1 行。絵文字は [gitmoji](https://gitmoji.dev) の定義に従う（✨ 機能、💄 見た目、🐛 修正、⚡️ 性能、🔧 設定、🍱 アセット、📝 文書、💬 文言、🎨 整形、♻️ リファクタ、🔥 削除）。
- コミットは作業単位で小さく区切り、`main` に直接積む。
- ステージは対象ファイルをパスで明示する。`src/content/blog/` にある未追跡の記事は本人の下書きなので、そのまま残してコミットに含めない。
- コミット前に `npm run format:check` と `npm run build` を通す。
- **push は本番公開と同じ**（GitHub 連携の Workers Builds が push で本番に反映する）。push の前に毎回、本人の了承を得る。

## 書き方の規則

- 和文の段落はソース上で 1 行に書く。途中で改行すると、描画時に半角スペースが入る（Markdown・`.astro` とも）。
- 内部リンクは末尾スラッシュ付きで書く（`/blog/`）。スラッシュなしは Workers が 307 でリダイレクトする。
- 色は `src/styles/tokens.css` の oklch トークンでだけ定義する。OGP 画像の SVG は 16 進の写しを持っているので、色かフォントを変えたら [tools/ogp/README.md](tools/ogp/README.md) の手順で再生成する。
- 書体の割り当て: 見出しは Zen Kaku Gothic New の 700、本文は 400、UI ラベル・日付・タグ・コードは CommitMono NL。ホームの名乗り「sqzume.dev」と、ブログ一覧・タグページのページ名（Blog、タグ名）は CommitMono の Bold。記事のタイトルは一覧でも Zen Kaku Gothic New のまま（等幅にすると和英間のスペースが広く見える）。UI ラベルの和文字は `--font-mono` のフォールバックで自動的に Zen Kaku Gothic New になる。
- UI 文言（ナビゲーション、ボタン、欄の見出し、下書きの印、日付など）は英語で書く。UI を英数字だけにして CommitMono で揃えるため。訳語は zed.dev に倣う（On This Page、All Posts など）。日付は `2026-09-22` の形式。記事の本文・プロフィール・説明文（description）など文章は日本語のまま。
- 出力する JavaScript はゼロを保つ。アクセス解析（Cloudflare Web Analytics）は Cloudflare がエッジで注入するので、ビーコンのタグはコードに書かない。Workers の observability は Worker スクリプトが無い構成では何も記録しないので使っていない。

## 動作確認

- `draft: true` の記事は本番ビルドに出ない。開発サーバ（`npm run dev`）で確認する。
- Astro 7 の `dev` と `preview` はデーモンとして常駐する。切り替える前に `npx astro dev stop` / `npx astro preview stop` で止める。止め忘れると、古いサーバが 4321 番で応答し続ける。
- ブラウザペインのスクリーンショットはスクロール後に真っ黒になることがある。スクロールした状態は DOM の実測で確かめ、画像はページ先頭で撮る。
