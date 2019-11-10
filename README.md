# Iterator Helper

[![github actions](https://github.com/syrflover/iterator-helper/workflows/test/badge.svg)](https://github.com/syrflover/iterator-helper/actions?query=workflow%3Atest+)
[![npm version](https://img.shields.io/npm/v/@syrflover/iterator?label=npm%20version)](https://www.npmjs.com/package/@syrflover/iterator)

Iterator Helper used `AsyncIterator`

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Path of internal modules](#path-of-internal-modules)
- [References](#references)

## Installation

### Node

```bash
npm install @syrflover/iterator
```

### Deno

Import master branch (as latest)

```typescript
import 'https://raw.githubusercontent.com/syrflover/iterator-helper/master/mod.ts';
```

Import specified version

```typescript
import 'https://raw.githubusercontent.com/syrflover/iterator-helper/v0.1.0/mod.ts';
```

## Usage

### Use constructor

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

### Use Array.prototype.iter

```typescript
// in browser or node
import '@syrflover/iterator/dist/types/global';

// in deno
import 'https://raw.githubusercontent.com/syrflover/iterator-helper/master/deno/types/global.ts';

[1, 2, 3, 4, 5, 6]
    .iter()
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .sum()
    .then((r) => logger.info(r)); // 15
```

## Path of internal modules

```txt
src
├── mod.ts
├── lib
│   ├── compare
│   │   └── mod.ts
│   ├── iterable
│   │   └── mod.ts
│   └── utils
│       └── mod.ts
├── methods
│   └── mod.ts
└── types
    ├── global.ts
    ├── mod.ts
    ├── function
    │   └── mod.ts
    └── guard
        └── mod.ts
```

## References

-   https://github.com/tc39/proposal-iterator-helpers
-   https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html
-   https://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html
