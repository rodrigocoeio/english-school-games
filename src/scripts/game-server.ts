import express from "express";
import path from "path";
import fs from "fs";
import GameConfigs from "../interfaces/game-configs";

const createGameServer = (gameConfigs: GameConfigs) => {
  return new Promise((resolveFunc) => {
    try {
      const gameServer = express();

      const gamesPath = process.env.GAMES_PATH || "./games";
      const gamePath = path.resolve(gamesPath + gameConfigs.path + "/dist");

      if(!fs.existsSync(gamePath))
        throw new Error('Game built not found!');

      gameServer.use("/", express.static(gamePath));

      gameServer.listen(gameConfigs.port, () => {
        console.log(
          `⚡️ [game-server]: ${gameConfigs.name} is running at http://localhost:${gameConfigs.port}`
        );

        resolveFunc(gameServer);
      });
    } catch (error:any) {
      console.error(
        `❌ [game-server]: ${gameConfigs.name}: Error ${error.message}`
      );
      resolveFunc(false);
    }
  });
};

export default createGameServer;
