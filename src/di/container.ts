import { Injectable } from "./injectable.ts";
import { isFactoryProvider, isValueProvider, Lifecycle } from "./provider.ts";
import { InjectionToken } from "./token.ts";

export class Container {
  private _injectables = new Set<Injectable<any>>();
  private _singletons = new Map<InjectionToken, any>();

  getInjectableByToken(token: InjectionToken) {
    for (const inj of this._injectables) {
      if (inj.token === token) {
        return inj;
      }
    }

    return undefined;
  }

  register<T = any>(i: Injectable<T>) {
    if (this.getInjectableByToken(i.token) !== undefined) {
      throw new Error("Injectable with this token had already been registered");
    }

    if (isValueProvider(i) && i.lifecycle === Lifecycle.Resolution) {
      throw new Error(
        "Value provider cannot be used with Lifecycle.Resolution scope",
      );
    }

    this._injectables.add(i);
  }

  dropSingletons() {
    this._singletons.clear();
  }

  dropInjectables() {
    this._injectables.clear();
  }

  drop() {
    this.dropSingletons();
    this.dropInjectables();
  }

  resolve<T>(token: InjectionToken): T {
    const injectable = this.getInjectableByToken(token);
    if (injectable === undefined) throw new Error("Unknown injection token");

    if (isValueProvider(injectable)) {
      return injectable.value;
    } else if (isFactoryProvider(injectable)) {
      if (injectable.lifecycle === Lifecycle.Resolution) {
        return injectable.factory(this);
      } else if (
        [undefined, Lifecycle.Singleton].includes(injectable.lifecycle)
      ) {
        if (this._singletons.has(injectable.token)) {
          return this._singletons.get(injectable.token);
        } else {
          this._singletons.set(injectable.token, injectable.factory(this));
          return this._singletons.get(injectable.token);
        }
      } else {
        throw new Error("Unknown scope");
      }
    } else {
      throw new Error("Unknown provider");
    }
  }
}

export const container = new Container();
