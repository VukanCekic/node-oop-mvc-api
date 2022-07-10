import fetch from "node-fetch";
import { IArticle } from "../model/article.model";

class ExternalFetchService {
  resourceUrl: string;

  constructor(resourceUrl: string) {
    this.resourceUrl = resourceUrl;
  }

  fetchResource = async (): Promise<IArticle[]> => {
    const response = await fetch(this.resourceUrl);
    const data: IArticle[] = await response.json();

    return data;
  };
}
export default ExternalFetchService;
