/**
 * @fileoverview Rollup config file
 */

export default [
    {
        input: "src/async-event-emitter.js",
        output: [
            {
                file: "dist/async-event-emitter.cjs",
                format: "cjs"
            },
            {
                file: "dist/async-event-emitter.js",
                format: "esm"
            }
        ]
    }   
];
