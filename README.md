# Iterator Helper

Iterator Helper used `AsyncIterator`, not used `Iterator`

## Installation

```bash
npm install @syrflover/iterator-helper
```

## Usage

```typescript
import '@syrflover/iterator-helper';

[1, 2, 3, 4, 5, 6]
    .iter()
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum()
    .then((r) => logger.info(r)); // 15
```

or

```typescript
import { iterator } from '@syrflover/iterator-helper';

iterator([1, 2, 3, 4, 5, 6])
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum()
    .then((r) => logger.info(r)); // 15
```

## Reference

-   https://github.com/tc39/proposal-iterator-helpers
