# Iterator Helper

[![github actions](https://github.com/syrflover/iterator-helper/workflows/build/badge.svg)](https://github.com/syrflover/iterator-helper/actions?query=workflow%3Abuild+)
[![github actions](https://github.com/syrflover/iterator-helper/workflows/test/badge.svg)](https://github.com/syrflover/iterator-helper/actions?query=workflow%3Atest+)
[![npm version](https://img.shields.io/npm/v/@syrflover/iterator?label=npm%20version)](https://www.npmjs.com/package/@syrflover/iterator)

Iterator Helper used `AsyncIterator`

## Installation

```bash
npm install @syrflover/iterator
```

## Usage

```typescript
// in browser or node
import '@syrflover/iterator/dist/types/global';

// in deno
import 'https://raw.githubusercontent.com/syrflover/iterator-helper/master/src/types/global.ts';

[1, 2, 3, 4, 5, 6]
    .iter()
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum()
    .then((r) => logger.info(r)); // 15
```

or

```typescript
// in browser or node
import { iterator } from '@syrflover/iterator';

// in deno
import { iterator } from 'https://raw.githubusercontent.com/syrflover/iterator-helper/master/mod.ts';

iterator([1, 2, 3, 4, 5, 6])
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum()
    .then((r) => logger.info(r)); // 15
```

## References

-   https://github.com/tc39/proposal-iterator-helpers
-   https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html
-   https://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html
