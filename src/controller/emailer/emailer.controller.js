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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const user_email_service_1 = __importDefault(require("../../service/user-email.service"));
class EmailerController {
    constructor() {
        this.router = express.Router();
        this.sendEmail = async (request, response) => {
            this.userEmailService.validateRequestBody(request.body);
            const body = request.body;
            const emailInfo = await this.userEmailService.sendEmail(body);
            response.render("email-sent", { emailInfo: emailInfo });
        };
        this.intializeRoutes();
        this.userEmailService = new user_email_service_1.default();
    }
    intializeRoutes() {
        /**
         * @swagger
         * /send-email:
         *   post:
         *     description: Get email with name and favorite category
         *     parameters:
         *      - name: email
         *        description: email of person
         *        in: formData
         *        required: true
         *        type: string
         *      - name: name
         *        description: name of person
         *        in: formData
         *        required: true
         *        type: string
         *      - name: favorite
         *        description: favorite category
         *        in: formData
         *        required: true
         *        type: string
         *     responses:
         *       200:
         *         description: Email sent
         *       400:
         *         description: Bad request, invalid params provided or bad email
         */
        this.router.post("/send-email", this.sendEmail);
    }
}
exports.default = EmailerController;
