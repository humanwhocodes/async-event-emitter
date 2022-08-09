# AsyncEventEmitter

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A utility for emitting events and responding with asynchronous functions.

## Usage

### Node.js

Install using [npm][npm] or [yarn][yarn]:

```
npm install @humanwhocodes/async-event-emitter

# or

yarn add @humanwhocodes/async-event-emitter
```

Import into your Node.js project:

```js
// CommonJS
const { AsyncEventEmitter } = require("@humanwhocodes/async-event-emitter");

// ESM
import { AsyncEventEmitter } from "@humanwhocodes/async-event-emitter";
```


### Deno

Import into your Deno project:

```js
import { AsyncEventEmitter } from "https://cdn.skypack.dev/@humanwhocodes/async-event-emitter?dts";
```

### Bun

Install using this command:

```
bun add @humanwhocodes/async-event-emitter
```

Import into your Bun project:

```js
import { AsyncEventEmitter } from "@humanwhocodes/async-event-emitter";
```

### Browser

It's recommended to import the minified version to save bandwidth:

```js
import { AsyncEventEmitter } from "https://cdn.skypack.dev/@humanwhocodes/async-event-emitter?min";
```

However, you can also import the unminified version for debugging purposes:

```js
import { AsyncEventEmitter } from "https://cdn.skypack.dev/@humanwhocodes/async-event-emitter";
```

## API

After importing, create a new instance of `AsyncEventEmitter` to start emitting events:

```js
const emitter = new AsyncEventEmitter();

// add some event handlers - functions can be async or not
emitter.on("foo", async () => "hello!");
emitter.on("foo", () => "goodbye!");

// emit an event
const results = await emitter.emit("foo");
console.log(results);   // ["hello!", "goodbye!"]

// you can also pass arguments
emitter.on("exclaim", suffix => "hello" + suffix);
emitter.on("exclaim", suffix => "goodbye" + suffix);

const results = await emitter.emit("exclaim", "!");
console.log(results);   // ["hello!", "goodbye!"]

// get the number of handlers for an event
const count = emitter.listenerCount("exclaim");
console.log(count);     // 2

// remove any unwanted handlers
const handler = () => {};
emitter.on("bar", handler);
emitter.off("bar", handler);

const results = await emitter.emit("bar");
console.log(results);   // []

```

## Developer Setup

1. Fork the repository
2. Clone your fork
3. Run `npm install` to setup dependencies
4. Run `npm test` to run tests

## License

Apache 2.0

[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/
