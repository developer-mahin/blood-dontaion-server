import { Server } from "http";
import app from "./app";
import Config from "./app/Config";

let server: Server;
function main() {
  server = app.listen(Config.port, () => {
    console.log(
      `Blood Donation Server IS RUNNING ON PORT http://localhost:${Config.port}`
    );
  });
}

main();
