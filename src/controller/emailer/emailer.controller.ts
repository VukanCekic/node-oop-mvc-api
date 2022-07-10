import * as express from "express";
import UserEmailService from "../../service/user-email.service";
import { IUserEmailRequest } from "../../model/user-email-request.model";

class EmailerController {
  public router = express.Router();
  public userEmailService: typeof UserEmailService.prototype;

  public constructor() {
    this.intializeRoutes();
    this.userEmailService = new UserEmailService();
  }

  public intializeRoutes() {
    this.router.post("/send-email", this.sendEmail);
  }

  sendEmail = async (request: express.Request, response: express.Response) => {
    this.userEmailService.validateRequestBody(request.body);
    const body = request.body as IUserEmailRequest;

    const emailInfo = await this.userEmailService.sendEmail(body);
    response.render("email-sent", { emailInfo: emailInfo });
  };
}
export default EmailerController;
