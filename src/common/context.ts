import { Service } from "./service.ts";

export interface ServiceContext {
  resolve: <T>(s: Service<T>) => T;
  init: (func: () => Promise<void> | void) => void;
}
