import * as image from "../assets/cat.png";
import Organism from "./Organism";

class Cat extends Organism {
  constructor() {
    super({ spritePath: image });
  }
  setup(app) {}
  update(app: App, delta: number) {
    this.sprite.x += delta;
  }
}

export default new Cat();
