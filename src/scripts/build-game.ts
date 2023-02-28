import GameConfigs from "../interfaces/game-configs";
import path from "path";
import { spawn } from "child_process";

const buildGame = (gameConfigs: GameConfigs, logs: boolean = false) => {
  return new Promise((resolveFunc) => {
    console.log("🛠️  Building " + gameConfigs.name + " game...");

    const gamePath = path.resolve(gameConfigs.path);
    const buildProcess = spawn("npm.cmd", ["run", "build"], { cwd: gamePath });

    const throwBuildError = (error:any) => {
      console.error("❌ Error building " + gameConfigs.name + "!");
      if(logs)
        console.error(error);
      resolveFunc(false);
    };

    buildProcess.stdout.on("data", (data) => {
      if (logs) process.stdout.write(data.toString());
    });
    buildProcess.stderr.on("data", (data) => {
      if (logs) process.stderr.write(data.toString());
    });
    buildProcess.on("exit", (code) => {
      if(code!==0)
        return throwBuildError(code);

      console.log("✅ Game Built: " + gameConfigs.name + "!");
      resolveFunc(true);
    });
    buildProcess.on("error", throwBuildError);
  });
};

export default buildGame;
