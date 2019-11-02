/**
 * PIXI系
 */

/** 描画アプリケーション */
type App = PIXI.Application;
type AppProcess = (app: App) => void;
/** 描画スプライト */
type Sprite = PIXI.Sprite;

/**
 * 保存用データ（JSON出力可能にする）
 */

/** GameObject内で保存可能な値 */
type MemorablePrimitive = string | number | boolean;
/** GameObject内で保存可能な配列 (型の混用禁止) */
type MemorablePrimitiveArray = string[] | number[] | boolean[];
/** GameObject内で保存可能な配列 (再帰しないオブジェクトの許可)) */
type MemorableArray = MemorablePrimitiveArray | MemorableObject[];
/** GameObject内で保存可能なオブジェクト (再帰禁止) */
type MemorableObject = { [member: string]: MemorablePrimitive };
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
type MemorableData = MemorablePrimitive | MemorableObject | MemorableArray;

/** 継承プロパティ */
type Props = { [key: string]: MemorableData };
/** 固有ステート */
type State = { [key: string]: MemorableData };
