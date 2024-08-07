type ExitFunc = (code: number) => never;

/** Namespace that Deno provides */
export type DenoNamespace = Partial<{
    exit: ExitFunc
    args: string[]
}> | undefined;

/** Namespace that Node and Bun provide */
export type ProcessNamespace = Partial<{
    exit: ExitFunc
    argv: string[]
}> | undefined;

/** Namespace that Bun provides */
export type BunNamespace = Partial<{
    argv: string[]
}> | undefined;
