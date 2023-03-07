import GameConfigs from "../interfaces/game-configs";
import path from "path";
import { spawnSync } from "child_process";
import fs from "fs";

const updateGame = (gameConfigs: GameConfigs, logs: boolean = false) => {
  console.log("🔄  Updating " + gameConfigs.name + " game...");

  try {
    const gamesPath = process.env.GAMES_PATH || "./games";
    const gamePath = path.resolve(gamesPath + gameConfigs.path);

    if (!fs.existsSync(gamePath)) {
      throw "game folder not found!";
    }

    const updateProcess = spawnSync("git", ["pull"], {
      cwd: gamePath,
      stdio: "pipe",
      encoding: "utf-8",
    });

    console.log("✅ Game Updated: " + gameConfigs.name + "!");
  } catch (error) {
    console.error("❌ Error updating " + gameConfigs.name + "!");
    if (logs) console.error(error);
  }
};

export default updateGame;
