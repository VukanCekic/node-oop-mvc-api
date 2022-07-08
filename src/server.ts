import App from "./app";
import ExternalController from "./controller/external/external";

const app = new App([new ExternalController()]);

app.listen();
