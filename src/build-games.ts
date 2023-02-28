import GameConfigs from "./interfaces/game-configs";
import gamesConfigs from "./configs/games.json";
import buildGame from "./scripts/build-game";

const buildGames = async () => {
  const builtGames = await Promise.all(
    gamesConfigs.map(async (gameConfigs: GameConfigs) => {
      const gameBuilt = await buildGame(gameConfigs);
      gameConfigs.built = gameBuilt ? true : false;
      return gameConfigs;
    })
  );

  return builtGames;
};

const run = async () => {
  const builtGames = await buildGames();
};

run();
