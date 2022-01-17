import { Provider } from "./provider.ts";
import { InjectionToken } from "./token.ts";
import { Lifecycle } from "./provider.ts";

export type Injectable<T> =
  & { token: InjectionToken; lifecycle?: Lifecycle }
  & Provider<T>;
