import GameConfigs from "./game-configs";
import path from "path";
import { spawn } from "child_process";

const buildGame = (gameConfigs: GameConfigs, logs: boolean=false) => {
  const gamePath = path.resolve(gameConfigs.path);

  console.log("Building " + gameConfigs.name + " game...");

  const buildProcess = spawn("npm.cmd", ["run","build"], { cwd: gamePath });

  return new Promise((resolveFunc) => {
    buildProcess.stdout.on("data", (data) => {
      if(logs) process.stdout.write(data.toString());
    });
    buildProcess.stderr.on("data", (data) => {
      if(logs) process.stderr.write(data.toString());
    });
    buildProcess.on("exit", (code) => {
      resolveFunc(code);
    });
    buildProcess.on("error", (error) => {
      console.log("Error building " + gameConfigs.name);
    });
  });
};

export default buildGame;
