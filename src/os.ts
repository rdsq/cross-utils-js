import type { DenoNamespace, ProcessNamespace, WindowNamespace } from "./namespaces.d.ts";

declare const Deno: DenoNamespace;
declare const process: ProcessNamespace;
declare const window: WindowNamespace;

/**
 * Get OS name. Works with Node, Deno, Bun and browser if `browserAsOs` is set on `true` (true by default)
 * @param options Options for the function
 * @returns OS name
 */
export async function getOsName(options: {
    /** Should it return `browser` if the script is running in browser. `true` by default */
    browserAsOs?: boolean;
} = {}): Promise<string> {
    if (typeof Deno !== 'undefined' && Deno.build?.os) {
        // deno
        return Deno.build.os;
    } else if (typeof process !== 'undefined' && process.versions) {
        // node and bun (through node compatibility)
        const os = await import('node:os');
        return os.platform();
    } else if ((options.browserAsOs ?? true) && typeof window !== 'undefined' && window.document) {
        return 'browser';
    } else {
        throw new Error("Unknown runtime");
    }
}
