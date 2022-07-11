import fetch from "node-fetch";
import { CustomError } from "../exceptions/custom-error.exception";
import { logger } from "../logger/logger";
import { IArticle } from "../model/article.model";

class StoreArticleService {
  constructor() {}

  getByCategroyAndId = (
    data: IArticle[],
    id: string,
    categoryName: string
  ): IArticle[] => {
    if (Number.isNaN(Number(id))) {
      logger.error(
        "StoreArticleService :: getByCategroyAndId :: ID for article is not a number"
      );
      throw new CustomError("Provided ID is not a number", 400);
    }

    const filtered = data.filter((item: IArticle) => {
      return item.category === categoryName && item.id === parseInt(id);
    });

    if (!filtered || filtered.length === 0) {
      logger.error(
        "StoreArticleService :: getByCategroyAndId :: Item with the given category and id not found"
      );
      throw new CustomError(
        "Item with the given category and id not found",
        400
      );
    }

    return filtered;
  };
}
export default StoreArticleService;
