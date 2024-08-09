type ExitFunc = (code: number) => never;

/** Namespace that Deno provides */
export type DenoNamespace = Partial<{
    exit: ExitFunc
    args: string[]
    version: {
        deno?: unknown
    }
    build: {
        arch?: string
        os?: string
    }
    Command: unknown
}> | undefined;

/** Namespace that Node and Bun provide */
export type ProcessNamespace = Partial<{
    exit: ExitFunc
    argv: string[]
    versions: {
        node?: unknown,
        bun?: unknown
    }
}> | undefined;

/** Namespace that Bun provides */
export type BunNamespace = Partial<{
    argv: string[]
    spawn: unknown
}> | undefined;

/** Namespace for browser window */
export type WindowNamespace = Partial<{
    document: unknown
    open: (url: string, target?: '_blank' | '_self') => WindowNamespace
}> | undefined;
