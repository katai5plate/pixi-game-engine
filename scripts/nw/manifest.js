// 現状未使用

const fs = require("fs-extra");
const { resolve } = require("path");
const { title, width, height, debug } = require("../metaConfig.json");
const [_, __, outDir] = process.argv;

const json = {
  name: title,
  window: {
    width,
    height,
    // icon,
    toolbar: false
  },
  main: "index.html",
  version: "1.0",
  ...(!!debug ? { "chromium-args": "--disable-devtools" } : {})
};

fs.writeJSONSync(resolve(outDir, "package.json"), json);
