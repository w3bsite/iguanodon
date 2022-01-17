import { assert } from "../deps.ts";
import { Container } from "../src/di/container.ts";
import { Lifecycle } from "../src/di/provider.ts";

Deno.test("di container throws when the same token was registered more than once", () => {
  const container = new Container();
  const token = Symbol();
  container.register({ token, value: 123 });

  assert.assertThrows(() => {
    container.register({ token, value: 123 });
  });
});

Deno.test("di container throws when using Lifecycle.Resolution with value", () => {
  const container = new Container();

  assert.assertThrows(() => {
    container.register<number>({
      token: Symbol(),
      value: 123,
      lifecycle: Lifecycle.Resolution,
    });
  });
});

Deno.test("di container singleton scope", () => {
  const container = new Container();
  const token = Symbol();
  container.register<number>({ token, factory: () => Math.random() });

  const r1 = container.resolve<number>(token);
  const r2 = container.resolve<number>(token);

  assert.assertEquals(r1, r2);
});

Deno.test("di container resolution scope", () => {
  const container = new Container();
  const token = Symbol();
  container.register<number>({
    token,
    factory: () => Math.random(),
    lifecycle: Lifecycle.Resolution,
  });

  const r1 = container.resolve<number>(token);
  const r2 = container.resolve<number>(token);

  assert.assertNotEquals(r1, r2);
});

Deno.test("di container drops singletons", () => {
  const container = new Container();
  const token = Symbol();
  container.register<number>({ token, factory: () => Math.random() });

  const r1 = container.resolve<number>(token);
  container.dropSingletons();
  const r2 = container.resolve<number>(token);

  assert.assertNotEquals(r1, r2);
});

Deno.test("di container drops injectables", () => {
  const container = new Container();
  const token = Symbol();

  function populate() {
    container.register({ token, value: Math.random() });
  }
  populate();

  const r1 = container.resolve(token);
  container.dropInjectables();
  populate();
  const r2 = container.resolve(token);

  assert.assertNotEquals(r1, r2);
});
