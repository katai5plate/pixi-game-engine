// import { KeyList } from "../../types/engine";
import { Key } from "ts-keycode-enum";

/*
  ここで素材登録 ---------------------------
*/

export enum KeyAlias {
  A,
  B,
  X,
  Y,
  Up,
  Down,
  Left,
  Right,
  L1,
  L2,
  R1,
  R2
}
export const keyList = [
  { alias: KeyAlias.A, src: [Key.Z, Key.Enter] },
  { alias: KeyAlias.B, src: [Key.X, Key.Space] },
  { alias: KeyAlias.X, src: [Key.C, Key.Escape] },
  { alias: KeyAlias.Y, src: [Key.V, Key.R] },
  { alias: KeyAlias.Up, src: [Key.UpArrow, Key.W] },
  { alias: KeyAlias.Down, src: [Key.DownArrow, Key.S] },
  { alias: KeyAlias.Left, src: [Key.LeftArrow, Key.A] },
  { alias: KeyAlias.Right, src: [Key.RightArrow, Key.D] },
  { alias: KeyAlias.L1, src: [Key.Shift] },
  { alias: KeyAlias.L2, src: [Key.Ctrl] },
  { alias: KeyAlias.R1, src: [Key.Q] },
  { alias: KeyAlias.R2, src: [Key.E] }
];

/*
  ここまで ---------------------------
*/

// addEventListener で採番される e.button の値を設定する
export enum MouseButtonAlias {
  Left = 0,
  Wheel = 1,
  Right = 2
}
