declare const Deno: any;

export async function runCommandInDeno(command: string, args: string[]): Promise<void> {
    const cmd = new Deno.Command(command, {
        args,
        stdout: 'piped'
    });
    await cmd.output();
}
