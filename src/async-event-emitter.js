/**
 * @fileoverview A utility async events.
 */

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------

/** @typedef {(...args:any)=>Promise<any>} EventHandler */

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Asserts that a given value is a string.
 * @param {any} value The value to test.
 * @returns {void}
 * @throws {TypeError} If the value is not a string. 
 */
function assertNonEmptyString(value) {
    if (!value || typeof value !== "string") {
        throw new TypeError(`Expected a non-empty string but found ${ String(value) }.`);
    }
}

/**
 * Asserts that a given value is a function.
 * @param {any} value The value to test.
 * @returns {void}
 * @throws {TypeError} If the value is not a function. 
 */
function assertFunction(value) {
    if (!value || typeof value !== "function") {
        throw new TypeError(`Expected a function but found ${ String(value) }.`);
    }
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * Object for publishing and subscribing to event with asynchronous
 * event handlers.
 */
export class AsyncEventEmitter {

    /**
     * Tracks event handlers for all events.
     * @type {Map<string,Array<EventHandler>>}
     */
    #handlers = new Map();

    /**
     * Emits a given event and passes the given arguments to each
     * event handler.
     * @param {string} eventName The name of the event to emit. 
     * @param  {...any?} args Any additional arguments to pass to the
     *      event handlers.
     * @returns {Array<any>|any} An array of resolved values if all
     *      event handlers pass or a single rejected value if any of
     *      the event handlers fail. 
     */
    emit(eventName, ...args) {

        assertNonEmptyString(eventName);

        const handlers = this.#handlers.get(eventName) || [];
        
        return Promise.all(
            handlers.map(handler => {
                return handler(...args);
            })
        );
    }

    /**
     * Retrieves the number of listeners for the given event.
     * @param {string} eventName The name of the event. 
     * @returns {number} The number of event handlers for this event. 
     */
    listenerCount(eventName) {

        assertNonEmptyString(eventName);

        let handlers = this.#handlers.get(eventName);

        if (!handlers) {
            return 0;
        }
        return handlers.length;
    }

    /**
     * Removes an event handler for the given event name.
     * @param {string} eventName The name of the event. 
     * @param {EventHandler} handler The function to remove.
     * @returns {void} 
     */
    off(eventName, handler) {

        assertNonEmptyString(eventName);
        assertFunction(handler);

        let handlers = this.#handlers.get(eventName);

        if (handlers) {
            
            const handlerIndex = handlers.indexOf(handler);
            console.log(handlerIndex)
            if (handlerIndex > -1) {
                handlers.splice(handlerIndex, 1);
            }
        }

    }

    /**
     * Assigns an event handler for the given event name.
     * @param {string} eventName The name of the event. 
     * @param {EventHandler} handler The function to call when the
     *      event occurs.
     * @returns {void} 
     */
    on(eventName, handler) {

        assertNonEmptyString(eventName);
        assertFunction(handler);

        let handlers = this.#handlers.get(eventName);

        if (!handlers) {
            /** @type {Array<EventHandler>} */
            handlers = [];
            this.#handlers.set(eventName, handlers);
        }

        handlers.push(handler);
    }

}
