import type { DenoNamespace, ProcessNamespace } from './namespaces.d.ts';

declare const Deno: DenoNamespace;
declare const process: ProcessNamespace;

/**
 * Exit the program with a status code, works with Node, Deno and Bun
 * @param code The exit code. 0 by default. 0 - success, 1 or more - failure
 */
export default function exit(code: number = 1): never {
    if (typeof Deno !== 'undefined' && Deno.exit) {
        // deno
        return Deno.exit(code);
    } else if (typeof process !== 'undefined' && process.exit) {
        // node and bun?
        return process.exit(code);
    } else {
        throw new Error('Unknown runtime');
    }
}
