import { Service } from "./service.ts";
import { InjectionToken } from "../di/token.ts";

export type Resolvable<T> = InjectionToken | Service<T>;
export interface ServiceContext {
  resolve: <T>(s: Resolvable<T>) => T;
  init: (func: () => Promise<void> | void) => void;
}
