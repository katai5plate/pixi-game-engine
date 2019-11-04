import { Key } from "ts-keycode-enum";

export class KeyboardButton {
  keyCode: number;
  name: string;
  pressed: boolean;
  interval: number;
  time: number;
  constructor(keyCode: number) {
    this.keyCode = keyCode;
    this.name = Key[keyCode];
    this.pressed = false;
    this.interval = this.time = 0;
  }
  onDown(): void {
    this.pressed = true;
  }
  onUp(): void {
    this.pressed = false;
    this.interval = this.time = 0;
  }
  onUpdate(): void {
    if (this.pressed) {
      this.time++;
    }
  }
}
