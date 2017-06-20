Scala関西Summit 2017公式サイト

## 環境準備
npmとgulpを準備して、プロジェクト直下で `npm install` コマンドを実行。

## 構成
- app
    - EJSソースなど。修正するときはここを修正すること
- dist
    - ビルド結果の静的サイト。 `make build` で生成されます。修正結果の確認はここのファイルをブラウザで開くこと。
- .publish
    - GithubPagesにデプロイするプラグインが勝手につくっているやつなので気にしなくていいです。
- Makefile
    - `make build`
        - appの内容をビルドしてdistに生成
    - `make deploy`
        - distの内容をデプロイして公開

## 修正手順
1. app以下の修正対象ファイルを修正
1. `make build` コマンドを実行して生成された結果を確認
1. `make deploy` コマンドで反映
1. Backlogのリポジトリのmasterへの修正反映をわすれずに！！

