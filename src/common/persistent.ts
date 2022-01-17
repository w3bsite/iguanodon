import { Service, susService } from "./service.ts";

export function persistent<T>(value: T, sym = Symbol()): Service<T> {
  return susService(sym, () => value);
}
