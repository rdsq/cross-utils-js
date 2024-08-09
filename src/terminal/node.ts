export function runCommandInNode(command: string, args: string[]): Promise<void> {
    return new Promise((resolve) => {
        import('node:child_process').then(cp => {
            const cmd = cp.spawn(command, args, {
                stdio: 'pipe'
            });
            cmd.on('exit', () => {
                resolve();
            });
        });
    });
}
