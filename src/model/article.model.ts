export interface IArticle {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRatingType;
}

export interface IRatingType {
  rate: number;
  count: number;
}
