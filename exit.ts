import type { DenoNamespace, ProcessNamespace } from './namespaces.d.ts';

declare const Deno: DenoNamespace;
declare const process: ProcessNamespace;

export default exit(code: number = 1): never {
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
