import * as PIXI from "pixi.js";
import { cloneDeep } from "lodash";
import { keeper } from "./helpers/utils";
import { application } from "./app";

interface GameObjectParamaters {
  props?: Props;
  state?: State;
  isEnable?: boolean;
  spriteSrc?: string;
}

/**
 * ゲームオブジェクト
 *
 * ### ライフサイクル
 * 0. `constructor`: 初期化 ( `wakeUp()` でループ処理開始 )
 * 1. `start()`: 初期化直後の処理
 * 2. `onEnable()`: 有効化時の処理
 * 3. `update()`: 有効中の毎フレームの処理
 * 4. `onDisable()`: 無効化時の処理
 * 5. `onFinish()`: 終了時の処理 ( ループ処理を切り、Disableな状態 )
 *
 * #### 備考
 * - 「 `wakeUp()` 前の状態」と 「 `isEnable === false` かつ `wakeUp` 後の状態」の違いは、ループ処理が行われているかどうかの違いで、前者は行われていない。
 */
export default class GameObject {
  application: App;
  props: Props;
  state: State;
  prevProps: Props;
  prevState: State;
  isEnable: boolean;
  sprite: Sprite;
  loopFn: () => void;

  constructor(paramaters: GameObjectParamaters) {
    this.application = application;
    this.props = paramaters.props || {};
    this.state = paramaters.state || {};
    this.isEnable = paramaters.isEnable || true;
    this.sprite = paramaters.spriteSrc
      ? PIXI.Sprite.from(paramaters.spriteSrc)
      : new PIXI.Sprite();
    this.application.stage.addChild(this.sprite);
    this.loopFn = this.run.bind(this);
  }

  /** 起動 */
  public wakeUp(): void {
    this.begin();
    return void 0;
  }
  /** 有効/無効の切り替え */
  public setActive(status: boolean): void {
    if (this.isEnable === false && status === true) {
      this.onEnable();
    } else if (this.isEnable === true && status === false) {
      this.onDisable();
    }
    this.sprite.visible = status;
    this.isEnable = status;
    return void 0;
  }
  /** ループを終了し無力化する */
  public setFinish(): void {
    this.finish();
    return void 0;
  }
  /** ステート更新 */
  protected setState(state: { [key: string]: MemorableData }): void {
    this.prevState = cloneDeep(state);
    Object.entries(state).map(([key, value]: [string, MemorableData]) => {
      this.state[key] = value;
    });
    this.onUpdateState(state);
    return void 0;
  }

  /** 初期化直後の処理 */
  protected start(): void {
    return void 0;
  }
  /** 有効化時の処理 */
  protected onEnable(): void {
    return void 0;
  }
  /** 有効中の毎フレームの処理 */
  protected update(delta: number): void {
    return keeper(delta);
  }
  /** 無効化時の処理 */
  protected onDisable(): void {
    return void 0;
  }
  /** 終了時の処理 */
  protected onFinish(): void {
    return void 0;
  }
  /** ステート更新時の処理 */
  protected onUpdateState(state: State): void {
    return keeper(state);
  }

  /** 内部の開始処理 */
  private begin(): void {
    this.start();
    this.application.ticker.add(this.loopFn);
  }
  /** 内部のループ処理 */
  private run(delta: number): void {
    if (this.isEnable) {
      this.update(delta);
    }
  }
  /** 内部の終了処理 */
  private finish(): void {
    this.application.ticker.remove(this.loopFn);
    this.application.stage.removeChild(this.sprite);
    this.isEnable = false;
    this.sprite.visible = false;
    this.sprite = null;
    this.onFinish();
  }
}
