import { logger } from './logger';

import { Iterator, IteratorHelper, iterator } from './iterator';

export { Iterator, IteratorHelper, iterator };

const a = [1, 2, Promise.resolve(Promise.resolve(3)), 4, 5, 6, 7, 8].iter();

const b = iterator([1, 2, Promise.resolve(Promise.resolve(3)), 4, 5, 6, 7, 8]);

const r = a
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .take(4)
    // .collect();
    .find((e) => e === 3);

// .sum()
// .then((e) => logger.debug(e));
