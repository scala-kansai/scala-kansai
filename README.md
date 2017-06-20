Scala関西Summit 2016公式サイト

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

## スポンサー情報追加手順
1. ロゴ画像をリサイズする
     - ロゴ画像置き場 https://drive.google.com/open?id=0B-gxuZxU10dzZnB4R01Pc1U2VEE
     - Platinum: 420px*240px
     - Gold: 300px*200px
     - Silver: 240px*160px
     - Bronze: 150px*100px
1. `app/images/sponsors` にロゴ画像を配置
1. `app/data/<プラン>-sponsors.json` に情報を追加
    - スポンサー情報 https://docs.google.com/spreadsheets/d/1_JBFVcCpvQMizBKmKzNFAWljXKZOMdYDDUj0-0GL6U4/edit?usp=sharing
    - 申し込み順になるようにしてください。
1. あとは修正手順参照。
