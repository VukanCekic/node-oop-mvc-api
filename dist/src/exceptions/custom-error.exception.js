"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
var CustomError = /** @class */ (function () {
    function CustomError(message, status) {
        if (status === void 0) { status = 500; }
        this.message = message;
        this.status = status;
    }
    return CustomError;
}());
exports.CustomError = CustomError;
