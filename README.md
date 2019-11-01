# hello-pixi

PixiJS をちゃんと入門する。
めざせゲームエンジン

- セットアップ `npm i`
- 開発・サーバー起動 `npm run dev`
- ブラウザ版をデプロイ `npm run build`

## 開発メモ

### webpack + ts

- 画像などのファイルパスは `import * as image from "./assets/hoge.png"` みたいにして参照する。
- `webpack.config.js` の `optimization.splitChunks.maxSize` で容量によるファイル分割のサイズをバイトで指定できる。
