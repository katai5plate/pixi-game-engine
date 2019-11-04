import { GameApp } from "./core/GameApp";
import * as config from "../game.config.json";

import { assetList } from "./lists/assets";
import { sceneList, SceneAlias } from "./lists/scenes";

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
    sceneList,
    defaultScene: SceneAlias.Title
  }
);
