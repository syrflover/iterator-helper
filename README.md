# Iterator Helper

![](https://github.com/syrflover/iterator-helper/workflows/test/badge.svg)
[![npm version](https://img.shields.io/npm/v/@syrflover/iterator?label=npm%20version)](https://www.npmjs.com/package/@syrflover/iterator)

Iterator Helper used `AsyncIterator`, not used `Iterator`

methods are implement by recursively

## Installation

```bash
npm install @syrflover/iterator
```

## Usage

```typescript
import '@syrflover/iterator/dist/types/global';

[1, 2, 3, 4, 5, 6]
    .iter()
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum()
    .then((r) => logger.info(r)); // 15
```

or

```typescript
import { iterator } from '@syrflover/iterator';

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
