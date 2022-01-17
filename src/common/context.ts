import { injectionTokenKey, Service } from "./service.ts";
import { InjectionToken } from "../di/token.ts";

export type Resolvable<T> = InjectionToken | Service<T>;

export function resolveResolvable<T>(r: Resolvable<T>): InjectionToken {
  if (typeof r === "string" || typeof r === "symbol") {
    return r;
  } else {
    return r[injectionTokenKey];
  }
}

export interface ServiceContext {
  resolve: <T>(s: Resolvable<T>) => T;
}
