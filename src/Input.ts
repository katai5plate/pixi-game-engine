// import { GameObject } from "./GameObject";

// import { Key } from "ts-keycode-enum";
// export { Key } from "ts-keycode-enum";

// export class Input extends GameObject {
//   keyBuffer: number[];
//   constructor() {
//     super();
//     this.keyBuffer = [];
//     document.onkeydown = (e: KeyboardEvent): void => {
//       this.keyBuffer[e.keyCode] = 1;
//       return void 0;
//     };
//     document.onkeyup = (e: KeyboardEvent): void => {
//       this.keyBuffer[e.keyCode] = 0;
//       return void 0;
//     };
//   }
//   update(delta: number): void {
//     // console.log(this.isTriggered(Key.Space));
//     this.keyBuffer = this.keyBuffer.map((k: number) => (k > 0 ? k + 1 : 0));
//   }
//   public isPressed(keycode: Key): boolean {
//     return this.keyBuffer[keycode] > 0;
//   }
//   public isReleased(keycode: Key): boolean {
//     return this.keyBuffer[keycode] === 0;
//   }
//   public isTriggered(keycode: Key): boolean {
//     // console.log(this.keyBuffer[keycode]);
//     return this.keyBuffer[keycode] === 1;
//   }
// }
