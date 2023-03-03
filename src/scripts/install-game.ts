import GameConfigs from "../interfaces/game-configs";
import path from "path";
import { spawnSync } from "child_process";
import fs from "fs";

const installGame = (gameConfigs: GameConfigs, logs: boolean = false) => {
  console.log("🛠️  Installing " + gameConfigs.name + " game...");

  try {
    let gamesPath = process.env.GAMES_PATH || "./games";
    gamesPath = path.resolve(gamesPath);
    const gamePath = gamesPath + gameConfigs.path;
    const gameRepository = gameConfigs.repository;

    if (logs) console.log("...clonning respository...");
    const gitCloneProcess = spawnSync("git", ["clone", gameRepository], {
      cwd: gamesPath,
      stdio: "pipe",
      encoding: "utf-8",
    });

    if (!fs.existsSync(gamePath)) {
      throw gitCloneProcess.stderr;
    }

    const packageJson = gamePath + "/package.json";
    if (!fs.existsSync(packageJson)) {
      throw "package.json not found!";
    }

    if (logs) console.log("...installing node packages...");
    const npmInstallProcess = spawnSync("npm.cmd", ["install"], {
      cwd: gamePath,
      stdio: "pipe",
      encoding: "utf-8",
    });

    if (!fs.existsSync(gamePath + "/node_modules")) {
      throw gitCloneProcess.stderr;
    }

    console.log("✅ Game Installed: " + gameConfigs.name + "!");

    return true;
  } catch (error) {
    if (logs) console.error(error);
    console.log("❌ Error installing " + gameConfigs.name + "!");
    return false;
  }
};

export default installGame;
