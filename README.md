This is a package that contains some utils designed to work across all JavaScript runtimes

## Exit

Exit is a function to end the program execution with a status code, works with Node, Deno and Bun

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
