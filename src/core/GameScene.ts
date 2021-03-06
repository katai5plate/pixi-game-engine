import * as PIXI from "pixi.js";
import { keeper } from "../helpers/utils";
import { GameObject } from "./GameObject";
import { Props } from "../../types/engine";

export class GameScene extends PIXI.Container {
  props: Props;
  unzipObjectList: typeof GameObject[];
  objectList: GameObject[];
  constructor(props: Props) {
    super();
    this.props = { ...props, gameScene: this };
  }
  public initialize(): void {
    this.onStart();
  }
  /** 初期化直後の処理 */
  public onStart(): void {
    return void 0;
  }
  /** 有効中の毎フレームの処理 */
  public onUpdate(delta: number): void {
    return keeper(delta);
  }
  /** 別シーンへの遷移時の処理 */
  public onExit(): void {
    return void 0;
  }
  insideUpdate(delta: number): void {
    this.onUpdate(delta);
    this.children.forEach((gameObject: GameObject) =>
      gameObject.insideUpdate(delta)
    );
  }
}
