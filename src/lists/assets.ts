import { AssetList } from "../../types/engine";

/*
  ここで素材登録 ---------------------------
*/

import * as cat from "../assets/cat.png";
import * as light from "../assets/light.png";
import * as rect from "../assets/rect.png";
export enum AssetAlias {
  Cat,
  Light,
  Rect
}
export const assetList: AssetList = [
  //
  { alias: AssetAlias.Cat, src: cat },
  { alias: AssetAlias.Light, src: light },
  { alias: AssetAlias.Rect, src: rect }
];
