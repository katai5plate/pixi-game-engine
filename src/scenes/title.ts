import * as image from "../assets/cat.png";
import GameObject from "../GameObject";

export default class Cat extends GameObject {
  constructor() {
    super({ spriteSrc: image });
  }
  update(delta): void {
    this.sprite.x += delta * 0.1;
  }
}
