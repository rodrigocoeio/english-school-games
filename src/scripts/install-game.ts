import GameConfigs from "../interfaces/game-configs";
import path from "path";
import { spawn } from "child_process";

const installGame = (gameConfigs: GameConfigs, logs: boolean = false) => {
  let gamesPath = process.env.GAMES_PATH || "./games";
  gamesPath = path.resolve(gamesPath);
  const gameRepository = gameConfigs.repository;

  return new Promise((resolveFunc) => {
    console.log("🛠️  Installing " + gameConfigs.name + " game...");

    const installProcess = spawn("git", ["clone", gameRepository], {
      cwd: gamesPath,
    });

    const throwInstallationError = (error: any) => {
      console.error(error);
      console.log("❌ Error installing " + gameConfigs.name + "!");
      resolveFunc(false);
    };

    installProcess.stdout.on("data", (data) => {
      if (logs) process.stdout.write(data.toString());
    });
    installProcess.stderr.on("data", (data) => {
      if (logs) process.stderr.write(data.toString());
    });

    installProcess.on("exit", (code) => {
      const packagesInstallProcess = spawn("npm.cmd", ["install"], {
        cwd: gameConfigs.path,
      });

      packagesInstallProcess.on("exit", (code) => {
        if (code !== 0) return throwInstallationError(code);

        console.log("✅ Game Installed: " + gameConfigs.name + "!");
        resolveFunc(true);
      });
      packagesInstallProcess.on("error", throwInstallationError);
    });

    installProcess.on("error", throwInstallationError);
  });
};

export default installGame;
