import * as PIXI from "pixi.js";
import * as config from "../game.config.json";

export const application = new PIXI.Application({
  width: config.width,
  height: config.height,
  antialias: config.antialias,
  transparent: config.transparent,
  resolution: config.resolution
});
