"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const external_fetch_service_1 = __importDefault(require("../../service/external-fetch.service"));
const store_article_service_1 = __importDefault(require("../../service/store-article.service"));
const config_1 = __importDefault(require("config"));
const custom_error_exception_1 = require("../../exceptions/custom-error.exception");
const logger_1 = require("../../logger/logger");
class StoreArticleController {
    // Factory pattern described bellow, private constructor and another blueprint to create the object of the given class
    constructor() {
        this.router = express.Router();
        // The type is the actual instance of the class
        // typescript hack since we do not use the regular constructor
        this.externalFetchService = null;
        this.soreArticleService = null;
        this.data = [];
        this.getAll = async (request, response) => {
            if (this.error) {
                logger_1.logger.error("StoreArticleController :: getAll :: Api returned no data");
                throw new custom_error_exception_1.CustomError(this.error.message, 500);
            }
            response.render("index", { data: this.data });
        };
        // It makes more sesne getting by category and ID then by title, since ID is unique and title can containt special characters that can cause issues while routing
        this.getByCategroyAndId = async (request, response) => {
            const categoryName = request.params.categoryName;
            const id = request.params.id;
            const filtered = this.soreArticleService.getByCategroyAndId(this.data, id, categoryName);
            response.render("index", { data: filtered });
        };
    }
    intializeRoutes() {
        /**
         * @swagger
         * /:
         *   get:
         *     description: Get all entries from API
         *     responses:
         *       200:
         *         description: Success,
         *       500:
         *         description: API server side error
         *
         */
        this.router.get("/", this.getAll);
        /**
         * @swagger
         * /categoryName/{categoryName}/id/{id}:
         *   get:
         *     description: Get item by categoryName and id
         *     parameters:
         *      - in: path
         *        name: categoryName
         *        description: category of item
         *        required: true
         *        type: string
         *      - in: path
         *        name: id
         *        description: id of item
         *        required: true
         *        type: number
         *     responses:
         *       200:
         *         description: Created
         *       400:
         *         description: User error, parameter id is not a number or item is not found
         */
        this.router.get("/categoryName/:categoryName/id/:id", this.getByCategroyAndId);
    }
}
_a = StoreArticleController;
StoreArticleController.CreateAsync = async (data, error) => {
    try {
        const me = new StoreArticleController();
        me.externalFetchService = new external_fetch_service_1.default(config_1.default.get("fakeStoreApi"));
        me.soreArticleService = new store_article_service_1.default();
        me.intializeRoutes();
        me.data = data || (await me.externalFetchService.fetchResource());
        me.error = error || undefined;
        return me;
    }
    catch (e) {
        logger_1.logger.error(e.message);
        return StoreArticleController.CreateAsync([], e);
    }
};
exports.default = StoreArticleController;
