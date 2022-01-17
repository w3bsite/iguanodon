import { ServiceContext } from "./context.ts";

export type Initializer<T = any> = (c: ServiceContext) => T | Promise<T>;

export const injectionTokenKey = Symbol();

export interface Service<T = any> {
  [injectionTokenKey]: symbol;
  initializer: Initializer<T>;
  dependencies: Service[];
}

export function service<T = any>(
  i: Initializer<T>,
  ...deps: Service[]
): Service<T> {
  return {
    [injectionTokenKey]: Symbol(),
    initializer: i,
    dependencies: deps,
  };
}

export function susService<T = any>(
  injectionToken: symbol,
  i: Initializer<T>,
  ...deps: Service[]
): Service<T> {
  return {
    [injectionTokenKey]: injectionToken,
    initializer: i,
    dependencies: deps,
  };
}
