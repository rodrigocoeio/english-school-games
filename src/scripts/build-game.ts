import GameConfigs from "../interfaces/game-configs";
import path from "path";
import { spawnSync } from "child_process";
import fs from "fs";

const buildGame = (gameConfigs: GameConfigs, logs: boolean = false) => {
  try {
    console.log("🛠️  Building " + gameConfigs.name + " game...");

    const gamesPath = process.env.GAMES_PATH || "./games";
    const gamePath = path.resolve(gamesPath + gameConfigs.path);
    const packageJson = gamePath + "/package.json";
    if (!fs.existsSync(packageJson)) {
      throw "package.json not found!";
    }

    const buildProcess = spawnSync("npm.cmd", ["run", "build"], {
      cwd: gamePath,
      stdio: "pipe",
      encoding: "utf-8",
    });

    if (!fs.existsSync(gamePath + "/dist")) {
      throw buildProcess.stderr;
    }

    console.log("✅ Game Built: " + gameConfigs.name + "!");
  } catch (error) {
    console.error("❌ Error building " + gameConfigs.name + "!");
    if (logs) console.error(error);
  }
};

export default buildGame;
