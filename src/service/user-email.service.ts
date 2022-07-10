import Ajv from "ajv";
import { JSONSchemaType } from "ajv";
import { CustomError } from "../exceptions/custom-error.exception";
import { logger } from "../logger/logger";
import { IGenericObject } from "../model/base.model";
import {
  IUserEmailRequest,
  uerEmailRequestSchema,
} from "../model/user-email-request.model";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import config from "config";

class UserEmailService {
  ajv: Ajv;
  schema: JSONSchemaType<IUserEmailRequest>;
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  mailOptions: Mail.Options;

  constructor(
    service = config.get("emailerService") as string,
    username = config.get("emailerUser") as string,
    password = config.get("emailerPassword") as string
  ) {
    this.ajv = new Ajv();
    this.schema = uerEmailRequestSchema;

    this.transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: username,
        pass: password,
      },
      logger: true,
    });

    this.mailOptions = {
      from: config.get("emailerUser") as string,
      to: "",
      subject: "Hello From Our Node Express App!",
      html: "",
    };
  }

  validateRequestBody(data: IGenericObject): void {
    const toValidate = this.ajv.compile(this.schema);
    const isValid = toValidate(data);

    if (!isValid) {
      logger.error(
        "UserEmailService :: validateRequestBody :: Invalid request body provided"
      );
      throw new CustomError(
        "Request body is malformed, email cannot be sent",
        400
      );
    }
  }
  async sendEmail(body: IUserEmailRequest) {
    this.mailOptions.to = body.email;
    this.mailOptions.html = `
    <h1>Name: ${body.name}</h1>
    <h3>Favorite Category: ${body.favorite}</h3>
    `;

    await this.transporter.sendMail(this.mailOptions);
  }
}
export default UserEmailService;
