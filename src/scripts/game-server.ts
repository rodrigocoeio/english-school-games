import express from "express";
import path from "path";
import fs from "fs";
import { spawnSync } from "child_process";
import GameConfigs from "../interfaces/game-configs";

const createGameServer = (gameConfigs: GameConfigs) => {
  return new Promise((resolveFunc) => {
    try {
      const gameServer = express();

      const gamesPath = process.env.GAMES_PATH || "./games";
      const gamePath = path.resolve(gamesPath + gameConfigs.path);
      const gameDistPath = path.resolve(gamesPath + gameConfigs.path + "/dist");
      const gameCardsPath = path.resolve(gamePath + "/cards");
      const gameCategoriesJsonPath = path.resolve(
        gameCardsPath + "/categories.json"
      );

      if (!fs.existsSync(gameDistPath))
        throw new Error("Game built not found!");

      if (fs.existsSync(gameCategoriesJsonPath)) {
        gameServer.get("/cards/categories.json", (req, res) => {
          if (fs.existsSync(gamePath + "/readcards.js"))
            spawnSync("node", ["readcards.js", "./cards"], {
              cwd: gamePath,
            });
          if (fs.existsSync(gamePath + "/readcards.cjs"))
            spawnSync("node", ["readcards.cjs", "./cards"], {
              cwd: gamePath,
            });

          const categoriesJson = fs.readFileSync(
            gameCategoriesJsonPath,
            "utf8"
          );
          return res.json(JSON.parse(categoriesJson));
        });
      }

      if (fs.existsSync(gameCardsPath)) {
        gameServer.use("/cards", express.static(gameCardsPath));
      }

      gameServer.use("/", express.static(gameDistPath));

      gameServer.listen(gameConfigs.port, () => {
        console.log(
          `⚡️ [game-server]: ${gameConfigs.name} is running at http://localhost:${gameConfigs.port}`
        );

        resolveFunc(gameServer);
      });
    } catch (error: any) {
      console.error(
        `❌ [game-server]: ${gameConfigs.name}: Error ${error.message}`
      );
      resolveFunc(false);
    }
  });
};

export default createGameServer;
