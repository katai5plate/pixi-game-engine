import { Key } from "ts-keycode-enum";
import { MouseButtonAlias } from "./lists/keys";

export class KeyboardButton {
  keyCode: number;
  name: string;
  pressed: boolean;
  time: number;
  constructor(keyCode: number) {
    this.keyCode = keyCode;
    this.name = Key[keyCode];
    this.pressed = false;
    this.time = 0;
  }
  onDown(): void {
    this.pressed = true;
  }
  onUp(): void {
    this.pressed = false;
    this.time = 0;
  }
  onUpdate(): void {
    if (this.pressed) {
      this.time++;
    }
  }
}
export class MouseButton {
  button: MouseButtonAlias;
  name: string;
  pressed: boolean;
  time: number;
  constructor(button: MouseButtonAlias, name: string) {
    this.button = button;
    this.name = name;
    this.pressed = false;
    this.time = 0;
  }
  onDown(): void {
    this.pressed = true;
  }
  onUp(): void {
    this.pressed = false;
    this.time = 0;
  }
  onUpdate(): void {
    if (this.pressed) {
      this.time++;
    }
  }
}
