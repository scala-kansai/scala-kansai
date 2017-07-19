Scala関西Summit 2017公式サイト

## 環境準備
npmを準備して、プロジェクト直下で `npm install` コマンドを実行。

## 構成
- app
    - EJSソースなど。修正するときはここを修正すること。
    - `_` が先頭についているディレクトリはdistにコピーされません。
- dist
    - ビルド結果の静的サイト。 `npm run build` で生成されます。修正結果の確認はここのファイルをブラウザで開くこと。
- .publish
    - GithubPagesにデプロイするプラグインが勝手につくっているやつなので気にしなくていいです。
- package.json
    - `npm run dev` ブラウザを起動して、開発モードを起動
    - `npm run build` distディレクトリにサイトを生成
    - `npm run deploy` distの内容をデプロイして公開

## 修正手順
1. app以下の修正対象ファイルを修正
1. `npm run build` コマンドを実行して生成された結果を確認
1. `npm run deploy` コマンドで反映
1. Backlogのリポジトリのmasterへの修正反映をわすれずに！！
