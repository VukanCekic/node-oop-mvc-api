import App from "./app";
import EmailerController from "./controller/emailer/emailer.controller";
import StoreArticleController from "./controller/external/store-article.controller";
const http = require("http");

(async () => {
  const externalController = await StoreArticleController.CreateAsync();
  const emailController = new EmailerController();

  const app = new App([externalController, emailController]);
  app.listen();
})();
