# Iterator Helper

Iterator Helper used `AsyncIterator`, not used `Iterator`

## Usage

```typescript
import '@syrflover/iterator-helper';

const r = await[(1, 2, 3, 4, 5, 6)]
    .iter()
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum();

logger.info(r); // 15
```

or

```typescript
import { iterator } from '@syrflover/iterator-helper';

const r = await iterator([1, 2, 3, 4, 5, 6])
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum();

logger.info(r); // 15
```

## Reference

-   https://github.com/tc39/proposal-iterator-helpers
