# Iterator Helper

![](https://github.com/syrflover/iterator-helper/workflows/test/badge.svg)
[![npm version](https://badge.fury.io/js/%40syrflover%2Fiterator.svg)](https://badge.fury.io/js/%40syrflover%2Fiterator)

Iterator Helper used `AsyncIterator`, not used `Iterator`

## Installation

```bash
npm install @syrflover/iterator
```

## Usage

```typescript
import '@syrflover/iterator';

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
