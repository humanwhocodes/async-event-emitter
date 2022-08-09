/**
 * @fileoverview Tests that Common JS can access npm package.
 */

const { AsyncEventEmitter } = require("../");
new AsyncEventEmitter();
console.log("CommonJS load: success");
