import './types/global';

import { iterator } from '.';

import { getLogger } from './logger';
import { AsyncIterator_ } from './iterator';

const logger = getLogger('playground');

// const b = iterator([1, 2, Promise.resolve(Promise.resolve(3)), 4, 5, 6, 7, 8]);
const a = iterator([1, 2, 3, Promise.resolve(4), 5, 6, 7, 8]);

const b = [1, 2, 3].iter();

const c = ['1', '2', '3'];

c.iter()
    .map((e) => parseInt(e, 10))
    .sum();

c.iter().map((e) => e);

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
