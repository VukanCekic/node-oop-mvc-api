"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const custom_error_exception_1 = require("../exceptions/custom-error.exception");
const logger_1 = require("../logger/logger");
const user_email_request_model_1 = require("../model/user-email-request.model");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("config"));
class UserEmailService {
    constructor(service = config_1.default.get("emailerService"), username = config_1.default.get("emailerUser"), password = config_1.default.get("emailerPassword")) {
        this.ajv = new ajv_1.default();
        this.schema = user_email_request_model_1.uerEmailRequestSchema;
        this.transporter = nodemailer_1.default.createTransport({
            service: service,
            auth: {
                user: username,
                pass: password,
            },
            logger: true,
        });
        this.mailOptions = {
            from: config_1.default.get("emailerUser"),
            to: "",
            subject: "Hello From Our Node Express App!",
            html: "",
        };
    }
    validateRequestBody(data) {
        const toValidate = this.ajv.compile(this.schema);
        const isValid = toValidate(data);
        if (!isValid) {
            logger_1.logger.error("UserEmailService :: validateRequestBody :: Invalid request body provided");
            throw new custom_error_exception_1.CustomError("Request body is malformed, email cannot be sent", 400);
        }
    }
    async sendEmail(body) {
        this.mailOptions.to = body.email;
        this.mailOptions.html = `
    <h1>Name: ${body.name}</h1>
    <h3>Favorite Category: ${body.favorite}</h3>
    `;
        await this.transporter.sendMail(this.mailOptions);
    }
}
exports.default = UserEmailService;
