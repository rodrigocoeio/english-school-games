import GameConfigs from "../interfaces/game-configs";
import path from "path";
import { spawn } from "child_process";

const updateGame = (gameConfigs: GameConfigs, logs: boolean = false) => {
  return new Promise((resolveFunc) => {
    console.log("🔄  Updating " + gameConfigs.name + " game...");

    const gamePath = path.resolve(gameConfigs.path);
    const updateProcess = spawn("git", ["pull"], { cwd: gamePath });

    const throwUpdateError = (error:any) => {
      console.error("❌ Error updating " + gameConfigs.name + "!");
      if(logs)
        console.error(error);
      resolveFunc(false);
    };

    updateProcess.stdout.on("data", (data) => {
      if (logs) process.stdout.write(data.toString());
    });
    updateProcess.stderr.on("data", (data) => {
      if (logs) process.stderr.write(data.toString());
    });
    updateProcess.on("exit", (code) => {
      if(code!==0)
        return throwUpdateError(code);

      console.log("✅ Game Updated: " + gameConfigs.name + "!");
      resolveFunc(true);
    });
    updateProcess.on("error", throwUpdateError);
  });
};

export default updateGame;
