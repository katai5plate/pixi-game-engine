import * as PIXI from "pixi.js";
import { GameScene } from "./GameScene";
import { AssetList, PIXIApplicationConfig, Props } from "../../types/engine";

interface GameAppParameters {
  assetList: AssetList;
  sceneList: typeof GameScene[];
}

export class GameApp extends PIXI.Application {
  props: Props;
  assetList: AssetList;
  currentScene: GameScene;
  zippedSceneList: typeof GameScene[];
  sceneList: GameScene[];

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
    this.zippedSceneList = gameAppParameters.sceneList;

    this.insideUpdateBind = this.insideUpdate.bind(this);
    this.time = 0;
    this.timeInt = 0;

    this.preloadAssets();
  }
  private initialize(): void {
    this.sceneList = this.zippedSceneList.map(
      (scene: typeof GameScene) => new scene(this.props)
    );
    return void 0;
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
    this.stage.addChild(...this.sceneList);
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
