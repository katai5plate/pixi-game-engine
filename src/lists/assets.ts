import { AssetList } from "../../types/engine";

/*
  ここで素材登録 ---------------------------
*/

import * as cat from "../assets/cat.png";
import * as light from "../assets/light.png";
export enum AssetAlias {
  Cat,
  Light
}
export const assetList: AssetList = [
  //
  { alias: AssetAlias.Cat, src: cat },
  { alias: AssetAlias.Light, src: light }
];
