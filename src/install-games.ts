import GameConfigs from "./interfaces/game-configs";
import gamesConfigs from "./configs/games.json";
import installGame from "./scripts/install-game";

const installGames = async () => {
  const installedGames = await Promise.all(
    gamesConfigs.map(async (gameConfigs: GameConfigs) => {
      const gameInstalled = await installGame(gameConfigs);
      gameConfigs.installed = gameInstalled ? true : false;
      return gameConfigs;
    })
  );

  return installedGames;
};

const run = async () => {
  const installedGames = await installGames();
};

run();