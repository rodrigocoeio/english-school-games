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

      if (!fs.existsSync(gameDistPath))
        throw new Error("Game built not found!");

      gameServer.use("/", express.static(gameDistPath));

      const cardsPath = path.resolve(gamePath + "/public/cards");
      const categoriesJsonPath = path.resolve(
        gamePath + "/src/stores/categories.json"
      );
      if (fs.existsSync(cardsPath) && fs.existsSync(categoriesJsonPath)) {
        gameServer.use("/cards", express.static(cardsPath));
        gameServer.use("/categories.json", (req, res) => {
          spawnSync("node", ["readcards.js"], {
            cwd: gamePath,
          });

          const categoriesJson = fs.readFileSync(categoriesJsonPath, "utf8");
          return res.json(JSON.parse(categoriesJson));
        });
      }

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
