import './types/global';

import { iterator } from '.';

import { getLogger } from './logger';

const logger = getLogger('playground');

// const b = iterator([1, 2, Promise.resolve(Promise.resolve(3)), 4, 5, 6, 7, 8]);
const a = [1, 2, 3, Promise.resolve(4), 5, 6, 7, 8];

const b = [1, 2, 3].iter();

a.iter()
    .takeWhile((e) => e < 4)
    .collect()
    .then((r) => logger.info(r));

/* b.filter((e) => e % 2 === 0)
    .map((e) => e + 1)
    .reverse()
    .take(3)
    .collect()
    // .sum()
    .then((r) => logger.info('Result =', r))
    .then(() => b.collect().then((e) => logger.info(e))); */

// .collect();
// .find((e) => e === 3);

// .sum()
// .then((e) => logger.debug(e));
