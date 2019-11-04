import * as PIXI from "pixi.js";
import { cloneDeep } from "lodash";
import { keeper } from "../helpers/utils";
import { State, Props, Sprite, MemorableData } from "../../types/engine";
import { AssetAlias } from "../lists/assets";

// import * as cat from "../assets/cat.png";

export interface GameObjectParamaters {
  props?: Props;
  state?: State;
  isEnable?: boolean;
  spriteAlias?: AssetAlias;
}

/**
 * ゲームオブジェクト
 *
 * ### ライフサイクル
 * 0. `constructor`: 初期化 ( `wakeUp()` でループ処理開始 )
 * 1. `onStart()`: 初期化直後の処理
 * 2. `onEnable()`: 有効化時の処理
 * 3. `onUpdate()`: 有効中の毎フレームの処理
 * 4. `onDisable()`: 無効化時の処理
 * 5. `onFinish()`: 終了時の処理 ( ループ処理を切り、Disableな状態 )
 *
 * #### 備考
 * - 「 `wakeUp()` 前の状態」と 「 `isEnable === false` かつ `wakeUp` 後の状態」の違いは、ループ処理が行われているかどうかの違いで、前者は行われていない。
 */
export class GameObject extends PIXI.Sprite {
  props: Props;
  state: State;
  prevState: State;
  isEnable: boolean;
  sprite: Sprite;

  constructor(props: Props) {
    super();
    this.props = props;
  }

  /** 起動 */
  public initialize(paramaters: GameObjectParamaters = {}): void {
    this.state = paramaters.state || {};
    this.isEnable = paramaters.isEnable || true;
    this.texture =
      paramaters.spriteAlias !== void 0
        ? this.props.gameApp.loader.resources[`${paramaters.spriteAlias}`]
            .texture
        : void 0;
    this.insideStart();
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
    this.insideFinish();
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
  protected onStart(): void {
    return void 0;
  }
  /** 有効化時の処理 */
  protected onEnable(): void {
    return void 0;
  }
  /** 有効中の毎フレームの処理 */
  protected onUpdate(delta: number): void {
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
  insideStart(): void {
    this.onStart();
  }
  /** 内部のループ処理 */
  insideUpdate(delta: number): void {
    if (this.isEnable) {
      this.onUpdate(delta);
    }
  }
  /** 内部の終了処理 */
  private insideFinish(): void {
    this.isEnable = false;
    this.visible = false;
    this.onFinish();
  }
}
