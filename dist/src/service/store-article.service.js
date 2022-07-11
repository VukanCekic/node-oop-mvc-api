"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_exception_1 = require("../exceptions/custom-error.exception");
var logger_1 = require("../logger/logger");
var StoreArticleService = /** @class */ (function () {
    function StoreArticleService() {
        this.getByCategroyAndId = function (data, id, categoryName) {
            if (Number.isNaN(Number(id))) {
                logger_1.logger.error("StoreArticleService :: getByCategroyAndId :: ID for article is not a number");
                throw new custom_error_exception_1.CustomError("Provided ID is not a number", 400);
            }
            var filtered = data.filter(function (item) {
                return item.category === categoryName && item.id === parseInt(id);
            });
            if (!filtered || filtered.length === 0) {
                logger_1.logger.error("StoreArticleService :: getByCategroyAndId :: Item with the given category and id not found");
                throw new custom_error_exception_1.CustomError("Item with the given category and title not found", 400);
            }
            return filtered;
        };
    }
    return StoreArticleService;
}());
exports.default = StoreArticleService;
