import { Server } from "http";
import { seedAdmin } from "./DB/seed";
import app from "./app";
import Config from "./app/Config";

let server: Server;
function main() {
  server = app.listen(Config.port, () => {
    console.log(
      `Blood Donation Server IS RUNNING ON PORT http://localhost:${Config.port}`
    );
  });

  seedAdmin();

  const exitHandler = () => {
    if (server) {
      server.close(() => {});
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
}

main();
