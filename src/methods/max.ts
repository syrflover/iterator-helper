import { getLogger } from '../logger.ts';

import { compare } from '../lib/compare/mod.ts';

import { maxBy } from './maxBy.ts';

const logger = getLogger('methods/max');

export function max<T>(iter: AsyncIterable<T>) {
    logger.trace('max()');
    return maxBy(compare, iter);
}
