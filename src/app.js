"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = require("./logger/logger");
const error_handler_middleware_1 = __importDefault(require("./middleware/error.handler.middleware"));
const path_1 = __importDefault(require("path"));
require("express-async-errors");
const custom_error_exception_1 = require("./exceptions/custom-error.exception");
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.port = config_1.default.get("port");
        /**
         * @swagger
         * /books:
         *   get:
         *     description: Get all books
         *     responses:
         *       200:
         *         description: Success
         *
         */
        const swaggerOptions = {
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
        this.swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
        this.initilizeViews();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandlerMiddleware();
    }
    initilizeViews() {
        this.app.set("views", path_1.default.join(__dirname, "view"));
        this.app.set("view engine", "ejs");
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
        this.app.get("*", (req, res) => {
            throw new custom_error_exception_1.CustomError("Route was not found", 404);
        });
    }
    initializeMiddlewares() {
        // Parsing incoming requets with JSON payloads and converting data to JSON
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.swaggerDocs));
    }
    initializeErrorHandlerMiddleware() {
        this.app.use(error_handler_middleware_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`Server listening on port: ${this.port}`);
        });
    }
}
exports.default = App;
