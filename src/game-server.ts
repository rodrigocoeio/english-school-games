import express from "express";
import path from "path";
import GameConfigs from "./game-configs";

const createGameServer = (gameConfigs: GameConfigs) => {
  const gameServer = express();
  const gamePath = path.resolve(gameConfigs.path + "/dist");

  gameServer.use("/", express.static(gamePath));

  gameServer.listen(gameConfigs.port, () => {
    console.log(
      `⚡️[game-server]: ${gameConfigs.name} is running at http://localhost:${gameConfigs.port}`
    );
  });
};

export default createGameServer;
