# simple-anime-database

<img width="1565" alt="スクリーンショット 2021-04-20 22 23 57" src="https://user-images.githubusercontent.com/51913879/115406302-0029d600-a22a-11eb-890f-9dbfb29e2788.png">

React × TypeScriptで作った簡易アニメデータベース。

https://simple-anime-database.vercel.app/

比較的最近の作品であれば

- 公式サイトURL
- Twitterアカウント
- スタッフ情報
- キャスト情報

といった最低限の情報が取得可能。

注目度の高い順に並んでいるので、今期見たいアニメを吟味する際の参考になるかも。

## セットアップ

必要なパッケージのインストール。

```
$ npm install # or yarn install
```

環境変数をセット。

```
$ cp .env.local.sample .env.local
```

- NEXT_PUBLIC_ANNICT_API_ACCESS_TOKEN: [Annict](https://developers.annict.jp/)のAPIアクセストークン
- NEXT_PUBLIC_SELF_MADE_API_BASE_ENDPOINT: 自作API https://github.com/kazama1209/anime-info-api のエンドポイント

起動。

```
$ npm run dev
 # or
$ yarn dev
```

http://localhost:3000/ にアクセスして正常に表示されればOK。
