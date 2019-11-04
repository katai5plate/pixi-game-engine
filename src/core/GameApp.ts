import * as PIXI from "pixi.js";
import { Key } from "ts-keycode-enum";
import { GameScene } from "./GameScene";
import {
  AssetList,
  PIXIApplicationConfig,
  Props,
  SceneList
} from "../../types/engine";
import { SceneAlias } from "../lists/scenes";
import { keyList, KeyAlias } from "../lists/keys";
import { KeyboardButton } from "../Input";

interface GameAppParameters {
  assetList: AssetList;
  sceneList: SceneList;
  defaultScene: SceneAlias;
}

export class GameApp extends PIXI.Application {
  props: Props;
  assetList: AssetList;
  sceneList: SceneList;
  currentScene: GameScene;
  defaultScene: SceneAlias;

  keys: { alias: KeyAlias; event: KeyboardButton }[];
  keyEvents: KeyboardButton[];

  public time: number;
  public timeInt: number;

  private insideUpdateBind: () => void;

  constructor(
    pixiApplicationConfig: PIXIApplicationConfig,
    gameAppParameters: GameAppParameters
  ) {
    super(pixiApplicationConfig);
    this.props = { ...pixiApplicationConfig, gameApp: this };
    this.assetList = gameAppParameters.assetList;

    this.sceneList = gameAppParameters.sceneList;
    this.defaultScene = gameAppParameters.defaultScene;

    this.insideUpdateBind = this.insideUpdate.bind(this);
    this.time = 0;
    this.timeInt = 0;

    // keyCode を index としたキー情報
    this.keys = keyList.reduce((p, { alias, src }) => {
      src.forEach(v => {
        p[v] = { alias, event: new KeyboardButton(v) };
      });
      return p;
    }, []);
    // this.keys からイベント参照のみ集めたもの
    this.keyEvents = this.keys.filter(Boolean).map(v => v.event);

    window.addEventListener("keydown", e => {
      this.keys[e.keyCode].event.onDown();
    });
    window.addEventListener("keyup", e => {
      this.keys[e.keyCode].event.onUp();
    });

    this.preloadAssets();
  }
  private initialize(): void {
    this.setScene(this.defaultScene);
    return void 0;
  }
  /** 指定のキーが押し続けられているか調べる */
  public getKeyDown(alias: KeyAlias): boolean {
    const keys = this.keys.filter(v => v.alias === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.event.pressed === true).includes(true);
  }
  /** 指定のキーが何フレーム以上押し続けられているか調べる */
  public getHowLongKeyDown(alias: KeyAlias, frames: number): boolean {
    const keys = this.keys.filter(v => v.alias === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.event.time >= frames).includes(true);
  }
  /** 指定のキーが押されていないことを調べる */
  public getKeyUp(alias: KeyAlias): boolean {
    const keys = this.keys.filter(v => v.alias === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.event.pressed === false).includes(true);
  }
  /** 指定のキーを押し始めたタイミングかを調べる */
  public getKeyTrigger(alias: KeyAlias): boolean {
    const keys = this.keys.filter(v => v.alias === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.event.time === 1).includes(true);
  }
  /** シーン変更 */
  public setScene(alias: SceneAlias): void {
    const scene: typeof GameScene = this.sceneList.filter(
      v => v.alias === alias
    )[0].gameScene;
    this.currentScene = new scene(this.props);
    this.stage.removeChildren();
    this.stage.addChild(this.currentScene);
  }
  /** 素材のプリロード */
  private preloadAssets(): void {
    this.assetList.reduce((p: PIXI.Loader, c): PIXI.Loader => {
      return p.add(`${c.alias}`, c.src);
    }, this.loader);
    this.loader.on("progress", (loader: PIXI.Loader) =>
      console.log(`progress: ${loader.progress} %`)
    );
    this.loader.load(() => {
      console.log("preloaded!");
      this.initialize();
      this.insideStart();
    });
  }
  /** 内部の開始処理(プリロード後) */
  private insideStart(): void {
    this.ticker.add(this.insideUpdateBind);
  }
  /** 内部のループ処理 */
  private insideUpdate(delta: number): void {
    if (this.time >= Number.MAX_SAFE_INTEGER) this.time = 0;
    this.time += delta;
    this.timeInt = Math.floor(this.time);
    this.keyEvents.forEach((keyEvent: KeyboardButton) => keyEvent.onUpdate());
    this.stage.children.forEach((gameScene: GameScene) =>
      gameScene.insideUpdate(delta)
    );
  }
}
