import type { DenoNamespace, ProcessNamespace } from "./namespaces.d.ts";

declare const Deno: DenoNamespace;
declare const process: ProcessNamespace;

export default async function open(resource: string): Promise<void> {}
