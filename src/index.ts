import express from "express";
import dotenv from "dotenv";
import GameConfigs from "./interfaces/game-configs";
import gamesConfigs from "./configs/games.json";
import createGameServer from "./scripts/game-server";

dotenv.config();

const runServer = async (runningGames: GameConfigs[]) => {
  const server = express();
  const port = process.env.PORT || 81;
  if (port) {
    server.use("/", (req, res) => res.json(runningGames));
    server.listen(port, () => {
      console.log(
        `⚡️ [server]: server is running at http://localhost:${port}`
      );
    });
  }
};

const runGameServers = async () => {
  const runningGames = await Promise.all(
    gamesConfigs.map(async (gameConfigs: GameConfigs) => {
      const gameServer = await createGameServer(gameConfigs);
      gameConfigs.href = "http://localhost:" + gameConfigs.port;
      gameConfigs.running = gameServer ? true : false;
      return gameConfigs;
    })
  );

  return runningGames;
};

const run = async () => {
  const runningGames = await runGameServers();
  runServer(runningGames);
};

run();
