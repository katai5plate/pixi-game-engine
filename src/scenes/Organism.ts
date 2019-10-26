import * as PIXI from "pixi.js";
export default class Organism {
  spritePath: string;
  sprite: Sprite;
  constructor({ spritePath }) {
    this.spritePath = spritePath;
    this.sprite = PIXI.Sprite.from(spritePath);
  }
  setup(app: App) {}
  append(app: App) {
    app.stage.addChild(this.sprite);
  }
  update(app: App, delta: number) {}
}
