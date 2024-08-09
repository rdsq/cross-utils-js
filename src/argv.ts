import type { DenoNamespace, ProcessNamespace, BunNamespace } from "./namespaces.d.ts";

declare const Deno: DenoNamespace;
declare const Bun: BunNamespace;
declare const process: ProcessNamespace;

/**
 * Get native argv of the current runtime
 * @param options Options for the function
 * @returns The native argv, or throws an error if the runtime is unknown
 */
export default function getArgv({ onlyArgs = true }: {
    /** Cut the runtime and cli paths on Bun and Node if `true`, otherwise add 2 empty strings on Deno. `true` by default */
    onlyArgs?: boolean,
} = {}): string[] | never {
    if (typeof Deno !== 'undefined' && Deno.args) {
        // if deno
        return onlyArgs ? Deno.args : [ '', '', ...Deno.args ];
    } else if (typeof process !== 'undefined' && process.argv) {
        // if node
        return onlyArgs ? process.argv.slice(2) : process.argv;
    } else if (typeof Bun !== 'undefined' && Bun.argv) {
        // if bun
        return onlyArgs ? Bun.argv.slice(2) : Bun.argv;
    } else {
        throw new Error('Unknown runtime');
    }
}