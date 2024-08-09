declare const Bun: any;

export async function runCommandInBun(command: string, args: string[]): Promise<void> {
    const proc = Bun.spawn([ command, ...args ], {
        stdout: 'pipe'
    });
    await proc.exited;
}
