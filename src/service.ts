import path from "path";
import Service from "node-windows";

const action: string = process.argv[2];

// Create a new service object
var svc = new Service.Service({
  name: "English Games Portal",
  description: "English Games Portal.",
  script: path.resolve("./dist/index.js"),
  nodeOptions: "--harmony --max_old_space_size=4096",
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
  console.log("✅ Service installed succefully!");
});

svc.on("uninstall", function () {
  console.log("✅ Service uninstalled succefully!");
});

svc.on("start", function () {
  console.log("✅ Service started succefully!");
});

svc.on("stop", function () {
  console.log("✅ Service stopped succefully!");
});

svc.on("restart", function () {
  console.log("✅ Service restarted succefully!");
});

switch (action) {
  case "install":
    svc.install();
    break;
  case "uninstall":
    svc.uninstall();
    break;
  case "start":
    svc.start();
    break;
  case "stop":
    svc.stop();
    break;
  case "restart":
    svc.restart();
    break;
  default:
    console.error("🔔 Command '"+action+"' not found!");
    break;
}
