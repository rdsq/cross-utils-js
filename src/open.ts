import type { DenoNamespace, ProcessNamespace, WindowNamespace, BunNamespace } from "./namespaces.d.ts";
import { getOsName } from "./os.ts";
import { runCommandInBun } from "./terminal/bun.ts";
import { runCommandInDeno } from "./terminal/deno.ts";
import { runCommandInNode } from "./terminal/node.ts";

declare const Deno: DenoNamespace;
declare const process: ProcessNamespace;
declare const window: WindowNamespace;
declare const Bun: BunNamespace;

/** How to open the link in the browser, `NewTab` by default */
export enum BrowserOpen {
    /** Open the link in a new browser tab */
    NewTab = 'newTab',
    /** Open the link in the same browser tab */
    SameTab = 'sameTab',
}

/** Options for the `open` function */
export type OpenOptions = {
    /** How to open the link in the browser, `NewTab` by default */
    browser?: BrowserOpen;
};

/**
 * Open a resource in the browser, works with Node, Deno, Bun and browser
 * @param resource The link to the resource to open
 * @param options Options for the function
 */
export default async function open(resource: string, options: OpenOptions = {}): Promise<void> {
    let command: string;
    const args: string[] = [];
    if (typeof window !== 'undefined' && window.open) {
        // if browser
        const target = (options.browser ?? BrowserOpen.NewTab) === BrowserOpen.NewTab ? '_blank' : '_self';
        window.open(resource, target);
        return;
    }
    const os = await getOsName();
    if (os === 'windows') {
        command = 'cmd';
        args.push('/s', '/c', 'start', '', '/b');
        resource = resource.replaceAll('&', '^&');
    } else if (os === 'darwin') {
        command = 'open';
    } else {
        // linux
        command = 'xdg-open';
    }
    args.push(resource);
    let runCommand;
    if (typeof Deno !== 'undefined' && Deno.Command) {
        // deno
        runCommand = runCommandInDeno;
    } else if (typeof process !== 'undefined' && process.versions) {
        // node
        runCommand = runCommandInNode;
    } else if (typeof Bun !== 'undefined' && Bun.spawn) {
        // bun
        runCommand = runCommandInBun;
    } else {
        throw new Error('Unknown runtime');
    }
    await runCommand(command, args);
}
