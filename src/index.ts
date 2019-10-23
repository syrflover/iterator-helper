import { logger } from './logger';

import { IteratorHelper } from './iterator';

export { IteratorHelper };

/* const a = [1, 2, Promise.resolve(Promise.resolve(3)), 4, 5, 6, 7, 8].iter();

const b = new IteratorHelper([1, 2, Promise.resolve(Promise.resolve(3)), 4, 5, 6, 7, 8]);

const r = a
    // .filter((e) => e % 2 === 0)
    // .map((e) => e + 1)
    .take(4)
    .collect()
    .then((e) => logger.debug(e)); */
