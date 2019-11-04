import * as PIXI from "pixi.js";
import { GameObject } from "../core/GameObject";
import { GameScene } from "../core/GameScene";
import { Props } from "../../types/engine";
import { AssetAlias } from "../lists/assets";
import { MouseButtonAlias } from "../lists/keys";

class Cat extends GameObject {
  dx: number;
  dy: number;
  speed: number;
  time: number;
  constructor(props: Props) {
    super(props);
    this.initialize({ spriteAlias: AssetAlias.Light });
  }
  onStart(): void {
    this.anchor.set(0.5);
    this.x = !this.props.gameApp.getMouseLeave()
      ? this.props.gameApp.getMousePos().x
      : this.props.width / 2;
    this.y = !this.props.gameApp.getMouseLeave()
      ? this.props.gameApp.getMousePos().y
      : this.props.height / 2;
    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;
    this.speed = Math.random() * 10 - 5;
    this.time = 0;
  }
  onUpdate(delta: number): void {
    this.angle += delta * this.speed;
    this.x += delta * this.dx * this.speed;
    this.y += delta * this.dy * this.speed;
    this.time += delta;
    this.alpha = 1 - this.time / 60;
    this.scale = new PIXI.Point(1 - this.time / 60, 1 - this.time / 60);
    if (this.time > 60) {
      this.destroy();
    }
  }
}

export class TitleScene extends GameScene {
  constructor(props: Props) {
    super(props);
    this.initialize();
  }
  onUpdate(/* delta: number */): void {
    if (this.props.gameApp.timeInt % 6 === 0) {
      for (let i = 0; i < 5; i++) {
        this.addChild(new Cat(this.props));
      }
    }
    if (this.props.gameApp.getMouseDown(MouseButtonAlias.Left)) {
      for (let i = 0; i < 30; i++) {
        this.addChild(new Cat(this.props));
      }
    }
  }
}
