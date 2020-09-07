# pixi-game-engine

PixiJS をちゃんと入門する。
めざせゲームエンジン

## Usage

- ダウンロード `git clone https://github.com/katai5plate/hello-pixi/`
- セットアップ `npm i`
- 開発・サーバー起動 `npm run dev`
- ブラウザ版をデプロイ `npm run build`

### 必要なもの
- Node.js
- Git
- Visual Studio Code
- VSCode拡張: ESLint
- VSCode拡張: Prettier

## 開発メモ

### webpack + ts

- 画像などのファイルパスは `import * as image from "./assets/hoge.png"` みたいにして参照する。
- `webpack.config.js` の `optimization.splitChunks.maxSize` で容量によるファイル分割のサイズをバイトで指定できる。
