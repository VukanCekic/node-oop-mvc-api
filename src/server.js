"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const emailer_controller_1 = __importDefault(require("./controller/emailer/emailer.controller"));
const store_article_controller_1 = __importDefault(require("./controller/external/store-article.controller"));
(async () => {
    const externalController = await store_article_controller_1.default.CreateAsync();
    const emailController = new emailer_controller_1.default();
    const app = new app_1.default([externalController, emailController]);
    app.listen();
})();
