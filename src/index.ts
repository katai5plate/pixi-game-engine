import "./index.css";
import { application } from "./app";
// import Life from "./Life";
document.body.appendChild(application.view);

import SceneTitle from "./scenes/title";

window.scene = new SceneTitle();
window.scene.wakeUp();

// const life = new Life(application, [SceneTitle]);

// life.start();
