"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("config"));
var logger_1 = require("./logger/logger");
var error_handler_middleware_1 = __importDefault(require("./middleware/error.handler.middleware"));
var path_1 = __importDefault(require("path"));
require("express-async-errors");
var custom_error_exception_1 = require("./exceptions/custom-error.exception");
var cors_1 = __importDefault(require("cors"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = (0, express_1.default)();
        this.port = config_1.default.get("port");
        this.host = config_1.default.get("host");
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
        var swaggerOptions = {
            swaggerDefinition: {
                info: {
                    title: "Node MVC OOP Api",
                    version: "1.0.0",
                },
            },
            apis: [
                "".concat(__dirname, "/controller/external/store-article.controller.ts"),
                "".concat(__dirname, "/controller/emailer/emailer.controller.ts"),
            ],
        };
        this.swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
        this.initilizeViews();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandlerMiddleware();
    }
    App.prototype.initilizeViews = function () {
        this.app.set("views", path_1.default.join(__dirname, "view"));
        this.app.set("view engine", "ejs");
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use("/", controller.router);
        });
        this.app.get("*", function (req, res) {
            throw new custom_error_exception_1.CustomError("Route was not found", 404);
        });
    };
    App.prototype.initializeMiddlewares = function () {
        // Parsing incoming requets with JSON payloads and converting data to JSON
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.swaggerDocs));
    };
    App.prototype.initializeErrorHandlerMiddleware = function () {
        this.app.use(error_handler_middleware_1.default);
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, this.host, function () {
            logger_1.logger.info("Server listening on host: ".concat(_this.host, " and port: ").concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
