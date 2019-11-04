import { SceneList } from "../../types/engine";

/*
  ここで素材登録 ---------------------------
*/

import { TitleScene } from "../scenes/title";
export enum SceneAlias {
  Title
}
export const sceneList: SceneList = [
  { alias: SceneAlias.Title, gameScene: TitleScene }
];
