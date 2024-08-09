type ExitFunc = (code: number) => never;

/** Namespace that Deno provides */
export type DenoNamespace = Partial<{
    exit: ExitFunc
    args: string[]
    version: {
        deno?: unknown
    }
    build: {
        os?: {
            arch: string
            os: string
        }
    }
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
}> | undefined;
