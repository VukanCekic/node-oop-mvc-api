import * as express from "express";
import ExternalFetchService from "../../service/external-fetch.service";
import StoreArticleService from "../../service/store-article.service";
import config from "config";
import { IArticle } from "../../model/article.model";
import { CustomError } from "../../exceptions/custom-error.exception";
import { logger } from "../../logger/logger";

class StoreArticleController {
  public router = express.Router();
  // The type is the actual instance of the class
  // typescript hack since we do not use the regular constructor
  public externalFetchService: typeof ExternalFetchService.prototype =
    null as unknown as typeof ExternalFetchService.prototype;
  public soreArticleService: typeof StoreArticleService.prototype =
    null as unknown as typeof StoreArticleService.prototype;
  public data: IArticle[] = [];
  public error: Error | undefined;

  // Factory pattern described bellow, private constructor and another blueprint to create the object of the given class
  private constructor() {}

  public static CreateAsync = async (
    data?: [],
    error?: Error
  ): Promise<StoreArticleController> => {
    try {
      const me = new StoreArticleController();
      me.externalFetchService = new ExternalFetchService(
        config.get("fakeStoreApi") as string
      );
      me.soreArticleService = new StoreArticleService();
      me.intializeRoutes();
      me.data = data || (await me.externalFetchService.fetchResource());
      me.error = error || undefined;
      return me;
    } catch (e) {
      logger.error((e as Error).message);
      return StoreArticleController.CreateAsync([], e as Error);
    }
  };

  public intializeRoutes() {
    /**
     * @swagger
     * /:
     *   get:
     *     description: Get all entries from API
     *     responses:
     *       200:
     *         description: Success,
     *       500:
     *         description: API server side error
     *
     */
    this.router.get("/", this.getAll);

    /**
     * @swagger
     * /categoryName/{categoryName}/id/{id}:
     *   get:
     *     description: Get item by categoryName and id
     *     parameters:
     *      - in: path
     *        name: categoryName
     *        description: category of item
     *        required: true
     *        type: string
     *      - in: path
     *        name: id
     *        description: id of item
     *        required: true
     *        type: number
     *     responses:
     *       200:
     *         description: Created
     *       400:
     *         description: User error, parameter id is not a number or item is not found
     */
    this.router.get(
      "/categoryName/:categoryName/id/:id",
      this.getByCategroyAndId
    );
  }

  getAll = async (request: express.Request, response: express.Response) => {
    if (this.error) {
      logger.error("StoreArticleController :: getAll :: Api returned no data");
      throw new CustomError(this.error.message, 500);
    }
    response.render("index", { data: this.data });
  };

  // It makes more sesne getting by category and ID then by title, since ID is unique and title can containt special characters that can cause issues while routing
  getByCategroyAndId = async (
    request: express.Request,
    response: express.Response
  ) => {
    const categoryName = request.params.categoryName;
    const id = request.params.id;

    const filtered = this.soreArticleService.getByCategroyAndId(
      this.data,
      id,
      categoryName
    );

    response.render("index", { data: filtered });
  };
}
export default StoreArticleController;
