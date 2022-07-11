"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_exception_1 = require("../exceptions/custom-error.exception");
var handleError = function (error, req, res, next) {
    var customError = error;
    if (!(error instanceof custom_error_exception_1.CustomError)) {
        customError = new custom_error_exception_1.CustomError(error.message);
    }
    res
        .status(customError.status)
        .render("error", { customError: customError });
};
exports.default = handleError;
