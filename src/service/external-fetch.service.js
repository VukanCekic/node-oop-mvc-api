"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class ExternalFetchService {
    constructor(resourceUrl) {
        this.fetchResource = async () => {
            const response = await (0, node_fetch_1.default)(this.resourceUrl);
            const data = await response.json();
            return data;
        };
        this.resourceUrl = resourceUrl;
    }
}
exports.default = ExternalFetchService;
