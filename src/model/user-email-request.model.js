"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uerEmailRequestSchema = void 0;
exports.uerEmailRequestSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        name: { type: "string" },
        favorite: { type: "string" },
    },
    required: ["email", "name", "favorite"],
    additionalProperties: false,
};
