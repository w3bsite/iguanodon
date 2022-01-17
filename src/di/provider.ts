import { Container } from "./container.ts";

export enum Lifecycle {
  Resolution,
  Singleton,
}

export interface ValueProvider<T> {
  value: T;
}

export interface FactoryProvider<T> {
  factory: (c: Container) => T;
}

export type Provider<T> =
  | ValueProvider<T>
  | FactoryProvider<T>;

export function isValueProvider(t: Provider<any>): t is ValueProvider<any> {
  return !!(t as ValueProvider<any>).value;
}

export function isFactoryProvider(t: Provider<any>): t is FactoryProvider<any> {
  return !!(t as FactoryProvider<any>).factory;
}
