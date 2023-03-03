import GameConfigs from "./interfaces/game-configs";
import gamesConfigs from "./configs/games.json";
import installGame from "./scripts/install-game";
import updateGame from "./scripts/update-game";
import buildGame from "./scripts/build-game";

const action: string = process.argv[2];

switch (action) {
  case "install":
    gamesConfigs.map(async (gameConfigs: GameConfigs) => {
      installGame(gameConfigs, true);
    });
    break;
  case "update":
    gamesConfigs.map(async (gameConfigs: GameConfigs) => {
      updateGame(gameConfigs, true);
    });
    break;
  case "build":
    gamesConfigs.map(async (gameConfigs: GameConfigs) => {
      buildGame(gameConfigs, true);
    });
    break;
  default:
    console.error("❌ command not found: " + action);
    break;
}
