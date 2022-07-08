import express from "express";
import config from "config";
import { logger } from "./logger/index";

class App {
  public app: express.Application;
  public port: number;
  public host: string;

  constructor(controllers: any) {
    this.app = express();
    this.port = config.get("port") as number;
    this.host = config.get("host") as string;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeMiddlewares() {
    // Parsing incoming requets with JSON payloads and converting data to JSON
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public listen() {
    this.app.listen(this.port, this.host, () => {
      logger.info(
        `Server listening on host: ${this.host} and port: ${this.port}`
      );
    });
  }
}

export default App;
