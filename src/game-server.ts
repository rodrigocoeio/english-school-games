import express from "express";
import path from "path";

export interface GameConfigs {
  name: string;
  path: string;
  port: number;
}

const createGameServer = (gameConfigs: GameConfigs) => {
  const gameServer = express();

  gameServer.use("/", express.static(path.resolve(gameConfigs.path)));

  gameServer.listen(gameConfigs.port, () => {
    console.log(
      `⚡️[game-server]: ${gameConfigs.name} is running at http://localhost:${gameConfigs.port}`
    );
  });
};

export default createGameServer;
