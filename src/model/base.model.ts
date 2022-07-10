export interface IType<T> extends Function {
  new (...args: any[]): T;
}

export interface IGenericObject {
  [key: string]: any;
}
