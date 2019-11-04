import { GameApp } from "../src/core/GameApp";

/**
 * PIXI系
 */

/** 描画アプリケーション */
export type App = PIXI.Application;
export type AppProcess = (app: App) => void;
/** 描画スプライト */
export type Sprite = PIXI.Sprite;
/** PIXI.Application の引数 */
export interface PIXIApplicationConfig {
  width: number;
  height: number;
  antialias?: boolean;
  transparent?: boolean;
  resolution?: number;
  autoStart?: boolean;
  view?: HTMLCanvasElement;
  autoDensity?: boolean;
  preserveDrawingBuffer?: boolean;
  forceCanvas?: boolean;
  backgroundColor?: number;
  clearBeforeRender?: boolean;
  forceFXAA?: boolean;
  powerPreference?: string;
  sharedTicker?: boolean;
  sharedLoader?: boolean;
  resizeTo?: Window | HTMLElement;
}

/**
 * 保存用データ（JSON出力可能にする）
 */

/** GameObject内で保存可能な値 */
export type MemorablePrimitive = string | number | boolean;
/** GameObject内で保存可能な配列 (型の混用禁止) */
export type MemorablePrimitiveArray = string[] | number[] | boolean[];
/** GameObject内で保存可能な配列 (再帰しないオブジェクトの許可)) */
export type MemorableArray = MemorablePrimitiveArray | MemorableObject[];
/** GameObject内で保存可能なオブジェクト (再帰禁止) */
export type MemorableObject = { [member: string]: MemorablePrimitive };
/**
 * GameObject内で保存可能なデータ
 *
 * ### 規則
 * - 使用可能な値は `string` `number` `boolean` 。
 * - 配列での型の混用禁止。
 * - 配列でオブジェクトを使用できるが、再帰不可。
 *
 * ### 補足
 * - State や Props のオブジェクトの値で使用される。
 * ```js
 * {
 *  state: {
 *    param_A: "abc",
 *    param_B: 123,
 *    param_C: true,
 *    param_D: [5, 10, 15, 20],
 *    param_E: [
 *      {x: 1, y: "A", z: true},
 *      {x: 2, y: "B", z: false}
 *    ],
 *  }
 * }
 * ```
 */
export type MemorableData =
  | MemorablePrimitive
  | MemorableObject
  | MemorableArray;

/** 継承プロパティ */
export type Props = {
  gameApp: GameApp;
  // [key: string]: MemorableData;
} & PIXIApplicationConfig;
/** 固有ステート */
export type State = { [key: string]: MemorableData };

/** 素材データ */
export type AssetList = { alias: string; src: string }[];
