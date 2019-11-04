// import * as image from "../assets/cat.png";
import { GameObject } from "../core/GameObject";
import { GameScene } from "../core/GameScene";
import { Props } from "../../types/engine";

class Cat extends GameObject {
  dx: number;
  dy: number;
  speed: number;
  constructor(props: Props) {
    super(props);
    this.initialize({ spriteSrc: "cat" });
  }
  onStart(): void {
    this.anchor.set(0.5);
    this.x = this.props.width / 2;
    this.y = this.props.height / 2;
    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;
    this.speed = Math.random() * 10 - 5;
  }
  onUpdate(delta: number): void {
    this.angle += delta * this.speed;
    this.x += delta * this.dx * this.speed;
    this.y += delta * this.dy * this.speed;
  }
}

export class SceneTitle extends GameScene {
  constructor(props: Props) {
    super(props);
    this.initialize();
  }
  onUpdate(delta: number): void {
    if (this.props.gameApp.timeInt % 10 === 0) {
      if (this.children.length < 100) {
        this.addChild(new Cat(this.props));
      }
      // console.log(this.props.gameApp.timeInt);
      // this.addChild(new SimpleCat(this.props));
      // console.log(this);
    }
  }
}
