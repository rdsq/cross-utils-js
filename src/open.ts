import type { DenoNamespace, ProcessNamespace, WindowNamespace, BunNamespace } from "./namespaces.d.ts";
import { getOsName } from "./os.ts";
import { runCommandInBun } from "./terminal/bun.ts";
import { runCommandInDeno } from "./terminal/deno.ts";
import { runCommandInNode } from "./terminal/node.ts";

declare const Deno: DenoNamespace;
declare const process: ProcessNamespace;
declare const window: WindowNamespace;
declare const Bun: BunNamespace;

export enum BrowserOpen {
    NewTab = 'newTab',
    SameTab = 'sameTab',
}

export type OpenOptions = {
    browser?: BrowserOpen;
};

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
