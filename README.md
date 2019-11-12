# Iterator Helper

[![github actions](https://github.com/syrflover/iterator-helper/workflows/test/badge.svg)](https://github.com/syrflover/iterator-helper/actions?query=workflow%3Atest+)
[![npm version](https://img.shields.io/npm/v/@syrflover/iterator?label=npm%20version)](https://www.npmjs.com/package/@syrflover/iterator)

Iterator Helper used `AsyncIterator`

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Path of internal modules](#path-of-internal-modules)
- [TypeDoc](#typedoc)
- [Releases](#releases)
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
import 'https://raw.githubusercontent.com/syrflover/iterator-helper/v0.2.3/mod.ts';
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

### Use ArrayLike.prototype.iter

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

#### List of supported ArrayLike.prototype.iter

- `String`
- `Array`
- `Int8Array`
- `Int16Array`
- `Int32Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Uint16Array`
- `Uint32Array`
- `Float32Array`
- `Float64Array`

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
    ├── functions
    │   └── mod.ts
    └── guards
        └── mod.ts
```

## TypeDoc

- [latest](https://syrflover.github.io/iterator-helper/docs/master)
- [v0.2.3](https://syrflover.github.io/iterator-helper/docs/v0.2.3)

## Releases

[Github Releases](https://github.com/syrflover/iterator-helper/releases)

## References

-   https://github.com/tc39/proposal-iterator-helpers
-   https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html
-   https://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html
