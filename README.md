<div align="center">
  <br />
  <img alt="dinos are cool!" src="./media/logo.svg" />
  <br>
  <br>
  <strong>Iguanodon</strong> is a next generation <a href="https://deno.kand">Deno</a> framework for building enterprise-level applications.
</div>

## Why?
Most of modern languages have powerful tooling for application development. For Node there is Nest, for Java there is Spring and for .NET there is ASP.NET. All of these frameworks allow to write scalable, enterprise-level source code.

But there wasn't such a solution for Deno. And thus Iguanodon has hatched!

##### But Iguanodon is a bit different

Instead of providing OOP APIs, Iguanodon takes a functional approach. It is pretty hard to explain, let's dive right into it!
## Diving in
```ts
import { service, start, persistent } from "https://deno.land/x/iguanodon@v0.1.0/mod.ts";

const dinosaurs = persistent(new Map<string, string>());

const dinosaursService = service(ctx => {
  const dinos = ctx.resolve(dinosaurs);

  return {
    get(name: string) {
      return dinos.get(name);
    },
    set(name: string, description: string) {
      dinos.set(name, description);
    },
    delete() {
      throw new Error("How dare you!?");
    }
  };
}, dinosaurs);

const appService  = service(ctx => {
  const dinos = ctx.resolve(dinosaursService);

  ctx.init(() => {
    dinos.set("trex", "big and strong!!");
    dinos.set("iguanodon", "has a big sharp nail!");
  })
  
  return {}
}, dinosaursService);
```