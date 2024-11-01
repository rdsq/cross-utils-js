> [!WARNING]
> This package is deprecated
>
> Use alternatives for these methods, such as [`@rdsq/open`](https://jsr.io/@rdsq/open) for `open`, or `node:` modules for other functions

This is a package that contains some utils designed to work across all JavaScript runtimes

If the runtime the script runs on is not supported, it will throw `Error('Unknown runtime')`

## Exit

`exit` is a function to end the program execution with a status code, works with Node, Deno and Bun

Example 1:

```ts
import { exit } from '@rdsq/cross-utils';

exit();
```

Example 2:

```ts
import exit from '@rdsq/cross-utils/exit';

exit(1);
```

## Get argv

`getArgv` is a function to get the native argv of this runtime, you can specify whether to include first 2 elements, which are not command line arguments, or to cut them by changing the `onlyArgs` option

Example 1:

```ts
import { getArgv } from '@rdsq/cross-utils';

console.log(getArgv());
// something like ['foo', 'bar']
```

Example 2:

```ts
import getArgv from '@rdsq/cross-utils/argv';

console.log(getArgv({ onlyArgs: false }));
// something like ['/path/to/runtime', '/path/to/cli', 'foo', 'bar']
// in Deno ['', '', 'foo', 'bar']
```

## Get OS Name

`getOsName` is a function to get the name of the OS the script is running on, works with Node, Deno, Bun and browser if `browserAsOs` is set on `true` (`true` by default)

Example:

```ts
import { getOsName } from '@rdsq/cross-utils/os';
// NOT default export

// it is async
console.log(await getOsName());
// 'windows', 'darwin', 'browser', for example
```

## Open

`open` function opens any URL. Works with Node, Deno, Bun and Browser

```ts
import open from '@rdsq/cross-utils/open';

await open('https://example.com/');
```
