export async function runCommandInNode(command: string, args: string[]): Promise<void> {
    const cp = await import('node:child_process');
    const cmd = cp.spawn(command, args, {
        stdio: 'pipe'
    });
    cmd.on('exit', )
}
