import * as express from "express";

class ExternalController {
  public path = "/books";
  public router = express.Router();

  private book: any[] = [
    {
      author: "Marcin",
      content: "Dolor sit amet",
      title: "Lorem Ipsum",
    },
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getBooks);
  }

  getBooks = (request: express.Request, response: express.Response) => {
    response.send(this.book);
  };
}
export default ExternalController;
