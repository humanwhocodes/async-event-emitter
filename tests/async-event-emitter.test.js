/**
 * @fileoverview Tests for the AsyncEventEmitter class.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { AsyncEventEmitter } from "../src/async-event-emitter.js";
import { assert, expect } from "chai";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("AsyncEventEmitter", () => {

    describe("on()", () => {
        it("should throw an error if the event name is empty", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.on("", () => {});
            }).to.throw(/Expected a non-empty string/);
            
        });

        it("should throw an error if the event name is not a string", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.on(5, () => {});
            }).to.throw(/Expected a non-empty string/);
            
        });

        it("should throw an error if the event handler is not a function", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.on("foo", 5);
            }).to.throw(/Expected a function/);
            
        });
    });

    describe("emit()", () => {
        it("should throw an error if the event name is empty", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.emit("");
            }).to.throw(/Expected a non-empty string/);
            
        });

        it("should throw an error if the event name is not a string", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.emit(true);
            }).to.throw(/Expected a non-empty string/);
            
        });
    });

    describe("on/emit()", () => {

        it("should return an empty array when no event handlers exist", async () => {
            const emitter = new AsyncEventEmitter();
            const result = await emitter.emit("foo");
            expect(result).to.deep.equal([]);
        });

        it("should call an async event handler when event is emitted", async () => {
            const emitter = new AsyncEventEmitter();

            emitter.on("foo", async () => "bar");

            const result = await emitter.emit("foo");
            expect(result).to.deep.equal(["bar"]);
        });

        it("should call multiple async event handlers when event is emitted", async () => {
            const emitter = new AsyncEventEmitter();

            emitter.on("foo", async () => "bar");
            emitter.on("foo", async () => "baz");

            const result = await emitter.emit("foo");
            expect(result).to.deep.equal(["bar", "baz"]);
        });

        it("should call multiple async event handlers with arguments when event is emitted", async () => {
            const emitter = new AsyncEventEmitter();

            emitter.on("foo", async suffix => "bar" + suffix);
            emitter.on("foo", async suffix => "baz" + suffix);

            const result = await emitter.emit("foo", "x");
            expect(result).to.deep.equal(["barx", "bazx"]);
        });


        it("should call multiple sync event handlers with arguments when event is emitted", async () => {
            const emitter = new AsyncEventEmitter();

            emitter.on("foo", suffix => "bar" + suffix);
            emitter.on("foo", suffix => "baz" + suffix);

            const result = await emitter.emit("foo", "x");
            expect(result).to.deep.equal(["barx", "bazx"]);
        });

        it("should call multiple event handlers with arguments when multiple events are emitted", async () => {
            const emitter = new AsyncEventEmitter();

            emitter.on("foo1", suffix => "bar" + suffix);
            emitter.on("foo2", suffix => "baz" + suffix);

            const result1 = await emitter.emit("foo1", "x");
            const result2 = await emitter.emit("foo2", "x");

            expect(result1).to.deep.equal(["barx"]);
            expect(result2).to.deep.equal(["bazx"]);
        });


    });

    describe("off()", () => {

        it("should remove event handler and not call it when event is emitted", async () => {
            const emitter = new AsyncEventEmitter();

            const handler = async suffix => "bar" + suffix;
            
            emitter.on("foo", handler);
            emitter.off("foo", handler);

            const result = await emitter.emit("foo", "x");
            expect(result).to.deep.equal([]);
        });

        it("should throw an error if the event name is empty", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.off("", () => { });
            }).to.throw(/Expected a non-empty string/);

        });

        it("should throw an error if the event name is not a string", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.off(5, () => { });
            }).to.throw(/Expected a non-empty string/);

        });

        it("should throw an error if the event handler is not a function", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.off("foo", 5);
            }).to.throw(/Expected a function/);

        });


    });

    describe("listenerCount()", () => {
        
        it("should return 0 when there are no event handlers", () => {
            const emitter = new AsyncEventEmitter();
            const result = emitter.listenerCount("foo");
            expect(result).to.equal(0);
        });

        it("should return 1 when there is one event handler", () => {
            const emitter = new AsyncEventEmitter();

            emitter.on("foo", async () => "bar");

            const result = emitter.listenerCount("foo");
            expect(result).to.equal(1);
        });

        it("should call multiple async event handlers when event is emitted", () => {
            const emitter = new AsyncEventEmitter();

            emitter.on("foo", async () => "bar");
            emitter.on("foo", async () => "baz");

            const result = emitter.listenerCount("foo");
            expect(result).to.equal(2);
        });

        it("should throw an error if the event name is empty", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.listenerCount("", () => { });
            }).to.throw(/Expected a non-empty string/);

        });

        it("should throw an error if the event name is not a string", () => {
            const emitter = new AsyncEventEmitter();

            expect(() => {
                emitter.listenerCount(5, () => { });
            }).to.throw(/Expected a non-empty string/);

        });


    });

});
