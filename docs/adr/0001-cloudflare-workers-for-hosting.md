# Cloudflare Pages ではなく Workers にデプロイする

静的サイトのホスティング先として最も素直に見えるのは Cloudflare Pages だが、このサイトは
**Workers (Static Assets)** にデプロイする。2026 年現在、Cloudflare は新規プロジェクトに対して
Pages ではなく Workers を推奨しており、静的アセットの配信が無償化され Pages Functions が
Workers 料金に揃えられた結果、Pages に留まる価格上の理由が消滅したため。

## Considered Options

- **GitHub Pages**: 追加アカウント不要で完全無料だが、独自ドメイン `sqzume.dev` の管理と
  配信元が別の場所に分かれる。また動的な処理を後から足す余地がない。
- **Cloudflare Pages**: 今も完全にサポートされており、既存プロジェクトを移行する必要はない。
  ただし新規で選ぶ理由がなくなった。
- **Cloudflare Workers** (採用): ドメイン・DNS・配信・将来の動的処理が 1 箇所に揃う。

## Consequences

- デプロイは GitHub 連携 (Workers Builds) による `git push` 起点の自動ビルドとする。
- 「記事ごとの OGP 画像を動的生成する」「閲覧数を数える」といった要求が将来出た場合、
  ホスティングを移さずに Worker 側で対応できる。この余地を残すことが Pages を選ばない実利。
