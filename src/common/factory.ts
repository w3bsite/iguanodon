import { Container } from "../di/container.ts";
import { Resolvable, resolveResolvable, ServiceContext } from "./context.ts";
import { injectionTokenKey, Service } from "./service.ts";

export class AppFactory {
  constructor(private _root: Service) {}

  private _stack: symbol[] = [];
  private _container = new Container();

  async start() {
    await this._initService(this._root);
  }

  private async _initService(s: Service) {
    if (this._stack.includes(s[injectionTokenKey])) {
      throw new Error(
        "Dependencies problem: circular or duplicated dependencies",
      );
    }
    this._stack.push(s[injectionTokenKey]);

    for (const dep of s.dependencies) {
      await this._initService(dep);
    }

    this._container.register({
      token: s[injectionTokenKey],
      value: await s.initializer(this._createContext()),
    });
  }

  private _createContext(): ServiceContext {
    return {
      resolve: <T>(resolvable: Resolvable<T>): T => {
        return this._container.resolve(resolveResolvable(resolvable));
      },
    };
  }
}

export function start(root: Service) {
  return new AppFactory(root).start();
}
