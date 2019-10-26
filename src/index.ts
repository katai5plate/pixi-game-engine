import * as PIXI from "pixi.js";

import * as image from "./assets/cat.png";

//Create a Pixi Application
let app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1
});

document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
app.loader.add(image).load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  //Create the cat sprite
  let cat = new PIXI.Sprite(app.loader.resources[image].texture);

  //Add the cat to the stage
  app.stage.addChild(cat);
}
