import { iterator } from '.';

import { getLogger } from './logger';

const logger = getLogger('playground');

// const b = iterator([1, 2, Promise.resolve(Promise.resolve(3)), 4, 5, 6, 7, 8]);

const a = [1, 2, 3, 4, 5, 6, 7, 8];

a.iter()
    .filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .take(3)
    .sum()
    .then((r) => logger.debug('Result =', r));
// .collect();
// .find((e) => e === 3);

// .sum()
// .then((e) => logger.debug(e));
