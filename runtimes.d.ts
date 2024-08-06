type ExitFunc = (code: number) => never;

export type DenoNamespace = Partial<{
    exit: ExitFunc
    args: string[]
}> | undefined;

export type ProcessNamespace = Partial<{
    exit: ExitFunc
    argv: string[]
}> | undefined;
