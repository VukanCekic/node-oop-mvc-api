import express from "express";
import config from "config";
import { logger } from "./logger/logger";
import errorHandler from "./middleware/error.handler.middleware";
import path from "path";
import "express-async-errors";
import { CustomError } from "./exceptions/custom-error.exception";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

class App {
  public app: express.Application;
  public port: number;
  public swaggerDocs: object;
  constructor(controllers: any) {
    this.app = express();

    this.port = config.get("port") as number;

    const swaggerOptions: swaggerJsDoc.Options = {
      swaggerDefinition: {
        info: {
          title: "Node MVC OOP Api",
          version: "1.0.0",
        },
      },
      apis: [
        `${__dirname}/controller/external/store-article.controller.ts`,
        `${__dirname}/controller/emailer/emailer.controller.ts`,
      ],
    };
    this.swaggerDocs = swaggerJsDoc(swaggerOptions);

    this.initilizeViews();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandlerMiddleware();
  }

  private initilizeViews() {
    this.app.set("views", path.join(__dirname, "view"));
    this.app.set("view engine", "ejs");
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
    this.app.get("*", (req, res) => {
      throw new CustomError("Route was not found", 404);
    });
  }

  private initializeMiddlewares() {
    // Parsing incoming requets with JSON payloads and converting data to JSON
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(cors());
    this.app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(this.swaggerDocs)
    );
  }

  private initializeErrorHandlerMiddleware() {
    this.app.use(errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }
}

export default App;
