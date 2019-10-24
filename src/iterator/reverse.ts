import { getLogger } from '../logger';

import { Iterator } from '../iterator';

import { _foldl } from './foldl';

import { toAsyncIterable } from '../lib/toIterable';

import { flip } from './lib/flip';
import { cons } from './lib/cons';

const logger = getLogger('iterator/reverse');

export function _reverse<T>(iter: AsyncIterable<T>) {
    logger.trace('_reverse()');
    const emptyIter = toAsyncIterable<T>([]);
    const it = _foldl(iter, emptyIter, (acc, e) => flip(acc, e, cons));

    return new Iterator(toAsyncIterable(it));
}
