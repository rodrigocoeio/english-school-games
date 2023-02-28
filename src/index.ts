import dotenv from "dotenv";
import createGameServer, { GameConfigs } from "./game-server";
import games from "./configs/games.json";

dotenv.config();

games.map((gameConfigs: GameConfigs) => {
  createGameServer(gameConfigs);
});
