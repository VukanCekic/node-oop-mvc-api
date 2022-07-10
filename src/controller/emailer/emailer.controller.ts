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

  sendEmail = async (request: express.Request, response: express.Response) => {
    this.userEmailService.validateRequestBody(request.body);
    const body = request.body as IUserEmailRequest;

    const emailInfo = await this.userEmailService.sendEmail(body);
    response.render("email-sent", { emailInfo: emailInfo });
  };
}
export default EmailerController;
