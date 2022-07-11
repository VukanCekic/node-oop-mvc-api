"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_exception_1 = require("../exceptions/custom-error.exception");
const logger_1 = require("../logger/logger");
class StoreArticleService {
    constructor() {
        this.getByCategroyAndId = (data, id, categoryName) => {
            if (Number.isNaN(Number(id))) {
                logger_1.logger.error("StoreArticleService :: getByCategroyAndId :: ID for article is not a number");
                throw new custom_error_exception_1.CustomError("Provided ID is not a number", 400);
            }
            const filtered = data.filter((item) => {
                return item.category === categoryName && item.id === parseInt(id);
            });
            if (!filtered || filtered.length === 0) {
                logger_1.logger.error("StoreArticleService :: getByCategroyAndId :: Item with the given category and id not found");
                throw new custom_error_exception_1.CustomError("Item with the given category and title not found", 400);
            }
            return filtered;
        };
    }
}
exports.default = StoreArticleService;
