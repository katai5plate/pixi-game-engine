import * as PIXI from "pixi.js";
import { GameScene } from "./GameScene";
import {
  AssetList,
  PIXIApplicationConfig,
  Props,
  SceneList,
  Pos
} from "../../types/engine";
import { SceneAlias } from "../lists/scenes";
import { keyList, KeyAlias, MouseButtonAlias } from "../lists/keys";
import { KeyboardButton, MouseButton } from "../Input";

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
  mouseEvents: MouseButton[];
  mousePos: Pos;
  mouseWheel: Pos;
  mouseIsLeave: boolean;
  mouseIsLost: boolean;

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

    this.mouseEvents = Object.entries(MouseButtonAlias).reduce(
      (p, [key, index]) => {
        if (!isNaN(Number(index)))
          p[index] = new MouseButton(Number(index), key);
        return p;
      },
      []
    );
    this.mousePos = this.mouseWheel = { x: 0, y: 0 };

    document.addEventListener("keydown", e => {
      this.keys[e.keyCode].event.onDown();
    });
    document.addEventListener("keyup", e => {
      this.keys[e.keyCode].event.onUp();
    });
    this.view.addEventListener("mousemove", e => {
      this.mousePos = this.clientPosToScreenPos(e.clientX, e.clientY);
    });
    this.view.addEventListener("mousedown", e => {
      this.mouseEvents[e.button].onDown();
    });
    this.view.addEventListener("mouseup", e => {
      this.mouseEvents[e.button].onUp();
    });

    // マウスが Canvas から離れたら強制的にボタンの押しっぱなしを解除する
    this.view.addEventListener("mouseleave", () => {
      this.mouseIsLeave = true;
      this.mouseEvents.forEach((mouseEvent: MouseButton) => mouseEvent.onUp());
    });
    this.view.addEventListener("mouseover", () => {
      this.mouseIsLeave = false;
    });
    window.addEventListener("blur", () => {
      this.mouseIsLost = true;
    });
    window.addEventListener("focus", () => {
      this.mouseIsLost = false;
    });

    this.view.addEventListener("wheel", e => {
      this.mouseWheel = { x: e.deltaX, y: e.deltaY };
    });

    // 右クリックメニュー禁止
    document.oncontextmenu = (): boolean => false;

    this.preloadAssets();
  }
  private initialize(): void {
    this.setScene(this.defaultScene);
    return void 0;
  }
  /** Canvas のサイズが何倍に描画されているか調べる */
  public getCanvasScale(): number {
    const { width: rw, height: rh } = this.view.getBoundingClientRect();
    const { width: cw, height: ch } = this.props;
    const x = rw / cw;
    const y = rh / ch;
    if (x !== y) {
      // console.warn("Canvas ratio is not constant:", { x, y });
      return (x + y) / 2;
    }
    return x;
  }
  /** Canvas の client 座標からスクリーン座標を取得 */
  public clientPosToScreenPos(clientX: number, clientY: number): Pos {
    const rect = this.view.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / this.getCanvasScale(),
      y: (clientY - rect.top) / this.getCanvasScale()
    };
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
  /** 指定のマウスボタンが押し続けられているか調べる */
  public getMouseDown(alias: MouseButtonAlias): boolean {
    const keys = this.mouseEvents.filter(v => v.button === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.pressed === true).includes(true);
  }
  /** 指定のマウスボタンが何フレーム以上押し続けられているか調べる */
  public getHowLongMouseDown(alias: MouseButtonAlias, frames: number): boolean {
    const keys = this.mouseEvents.filter(v => v.button === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.time >= frames).includes(true);
  }
  /** 指定のマウスボタンが押されていないことを調べる */
  public getMouseUp(alias: MouseButtonAlias): boolean {
    const keys = this.mouseEvents.filter(v => v.button === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.pressed === false).includes(true);
  }
  /** 指定のマウスボタンを押し始めたタイミングかを調べる */
  public getMouseTrigger(alias: MouseButtonAlias): boolean {
    const keys = this.mouseEvents.filter(v => v.button === alias);
    if (keys.length === 0) return false;
    return keys.map(k => k.time === 1).includes(true);
  }
  /** マウスのスクリーン座標を取得 */
  public getMousePos(): Pos {
    return this.mousePos;
  }
  /** マウスホイールの移動量を取得 */
  public getMouseWheel(): Pos {
    return this.mouseWheel;
  }
  /** マウスが Canvas から離れたか */
  public getMouseLeave(): boolean {
    return this.mouseIsLeave || this.mouseIsLost;
  }
  /** マウスがウィンドウから離れたか */
  public getMouseLost(): boolean {
    return this.mouseIsLost;
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
    this.mouseEvents.forEach((mouseEvent: MouseButton) =>
      mouseEvent.onUpdate()
    );
    this.stage.children.forEach((gameScene: GameScene) =>
      gameScene.insideUpdate(delta)
    );
  }
}
