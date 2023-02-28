import dotenv from "dotenv";
import GameConfigs from "./game-configs";
import games from "./configs/games.json";
import buildGame from "./build-game";
import createGameServer from "./game-server";

dotenv.config();

games.map(async (gameConfigs: GameConfigs) => {
  await buildGame(gameConfigs);
  createGameServer(gameConfigs);
});