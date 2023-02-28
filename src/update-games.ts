import GameConfigs from "./interfaces/game-configs";
import gamesConfigs from "./configs/games.json";
import updateGame from "./scripts/update-game";

const updateGames = async () => {
  const updatedGames = await Promise.all(
    gamesConfigs.map(async (gameConfigs: GameConfigs) => {
      const gameUpdated = await updateGame(gameConfigs);
      gameConfigs.built = gameUpdated ? true : false;
      return gameConfigs;
    })
  );

  return updatedGames;
};

const run = async () => {
  const updatedGames = await updateGames();
};

run();
