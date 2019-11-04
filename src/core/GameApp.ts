import * as PIXI from "pixi.js";
import { GameScene } from "./GameScene";
import {
  AssetList,
  PIXIApplicationConfig,
  Props,
  SceneList
} from "../../types/engine";

interface GameAppParameters {
  assetList: AssetList;
  sceneList: SceneList;
  defaultScene: string;
}

export class GameApp extends PIXI.Application {
  props: Props;
  assetList: AssetList;
  sceneList: SceneList;
  currentScene: GameScene;
  defaultScene: string;
  // zippedSceneList: typeof GameScene[];
  // sceneList: GameScene[];

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

    // GameScene を展開して props を継承させる
    this.sceneList = gameAppParameters.sceneList;
    this.defaultScene = gameAppParameters.defaultScene;

    this.insideUpdateBind = this.insideUpdate.bind(this);
    this.time = 0;
    this.timeInt = 0;

    this.preloadAssets();
  }
  private initialize(): void {
    this.setScene(this.defaultScene);
    return void 0;
  }
  /** シーン変更 */
  public setScene(alias: string): void {
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
      return p.add(c.alias, c.src);
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
    this.stage.children.forEach((gameScene: GameScene) =>
      gameScene.insideUpdate(delta)
    );
  }
}
