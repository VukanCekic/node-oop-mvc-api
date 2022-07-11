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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var external_fetch_service_1 = __importDefault(require("../../service/external-fetch.service"));
var store_article_service_1 = __importDefault(require("../../service/store-article.service"));
var config_1 = __importDefault(require("config"));
var custom_error_exception_1 = require("../../exceptions/custom-error.exception");
var logger_1 = require("../../logger/logger");
var StoreArticleController = /** @class */ (function () {
    // Factory pattern described bellow, private constructor and another blueprint to create the object of the given class
    function StoreArticleController() {
        var _this = this;
        this.router = express.Router();
        // The type is the actual instance of the class
        // typescript hack since we do not use the regular constructor
        this.externalFetchService = null;
        this.soreArticleService = null;
        this.data = [];
        this.getAll = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (this.error) {
                    logger_1.logger.error("StoreArticleController :: getAll :: Api returned no data");
                    throw new custom_error_exception_1.CustomError(this.error.message, 500);
                }
                response.render("index", { data: this.data });
                return [2 /*return*/];
            });
        }); };
        // It makes more sesne getting by category and ID then by title, since ID is unique and title can containt special characters that can cause issues while routing
        this.getByCategroyAndId = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var categoryName, id, filtered;
            return __generator(this, function (_b) {
                categoryName = request.params.categoryName;
                id = request.params.id;
                filtered = this.soreArticleService.getByCategroyAndId(this.data, id, categoryName);
                response.render("index", { data: filtered });
                return [2 /*return*/];
            });
        }); };
    }
    StoreArticleController.prototype.intializeRoutes = function () {
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
    };
    var _a;
    _a = StoreArticleController;
    StoreArticleController.CreateAsync = function (data, error) { return __awaiter(void 0, void 0, void 0, function () {
        var me, _b, _c, e_1;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    me = new StoreArticleController();
                    me.externalFetchService = new external_fetch_service_1.default(config_1.default.get("fakeStoreApi"));
                    me.soreArticleService = new store_article_service_1.default();
                    me.intializeRoutes();
                    _b = me;
                    _c = data;
                    if (_c) return [3 /*break*/, 2];
                    return [4 /*yield*/, me.externalFetchService.fetchResource()];
                case 1:
                    _c = (_d.sent());
                    _d.label = 2;
                case 2:
                    _b.data = _c;
                    me.error = error || undefined;
                    return [2 /*return*/, me];
                case 3:
                    e_1 = _d.sent();
                    logger_1.logger.error(e_1.message);
                    return [2 /*return*/, StoreArticleController.CreateAsync([], e_1)];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return StoreArticleController;
}());
exports.default = StoreArticleController;
