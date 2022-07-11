"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_exception_1 = require("../exceptions/custom-error.exception");
const handleError = (error, req, res, next) => {
    let customError = error;
    if (!(error instanceof custom_error_exception_1.CustomError)) {
        customError = new custom_error_exception_1.CustomError(error.message);
    }
    res
        .status(customError.status)
        .render("error", { customError: customError });
};
exports.default = handleError;
