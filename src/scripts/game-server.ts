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
      if (fs.existsSync(cardsPath)) {
        gameServer.use("/cards", express.static(cardsPath));
      }

      const storeCategoriesJsonPath = path.resolve(
        gamePath + "/src/stores/categories.json"
      );
      const publicCategoriesJsonPath = path.resolve(
        gamePath + "/public/categories.json"
      );
      const categoriesJsonPath = fs.existsSync(storeCategoriesJsonPath)
        ? storeCategoriesJsonPath
        : publicCategoriesJsonPath;

      if (fs.existsSync(categoriesJsonPath)) {
        gameServer.use("/categories.json", (req, res) => {
          spawnSync("npm", ["run", "readcards"], {
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
