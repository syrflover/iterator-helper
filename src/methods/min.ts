import { getLogger } from '../logger.ts';

import { compare } from '../lib/compare/mod.ts';

import { minBy } from './minBy.ts';

const logger = getLogger('methods/min');

export function min<T>(iter: AsyncIterable<T>) {
    logger.trace('min()');
    return minBy(compare, iter);
}
