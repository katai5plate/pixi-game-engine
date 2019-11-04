import { GameApp } from "./core/GameApp";
import * as config from "../game.config.json";

import assetList from "./assetList";
import { SceneTitle } from "./scenes/title";
// import { GameScene } from "./core/GameScene";

export const application = new GameApp(
  {
    width: config.width,
    height: config.height,
    antialias: config.antialias,
    transparent: config.transparent,
    resolution: config.resolution
  },
  {
    assetList,
    sceneList: [
      // GameScene
      { alias: "title", gameScene: SceneTitle }
    ],
    defaultScene: "title"
  }
);
