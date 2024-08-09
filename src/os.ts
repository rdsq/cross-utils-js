import type { DenoNamespace, ProcessNamespace } from "./namespaces.d.ts";

declare const Deno: DenoNamespace;
declare const process: ProcessNamespace;

/**
 * Get OS name
 * @returns OS name
 */
export async function getOsName(): Promise<string> {
    if (typeof Deno !== 'undefined' && Deno.build?.os) {
        // deno
        return Deno.build.os;
    } else if (typeof process !== 'undefined' && process.versions) {
        // node and bun (through node compatibility)
        const os = await import('node:os');
        return os.platform();
    } else {
        throw new Error("Unknown runtime");
    }
}
