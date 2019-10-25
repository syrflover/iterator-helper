import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

import { _foldl } from './foldl';

import { toAsyncIterable } from '../lib/iterable';

import { flip } from './lib/flip';
import { cons } from './lib/cons';

const logger = getLogger('iterator/reverse');

function _reverse_impl_fn<T>(iter: AsyncIterable<T>) {
    logger.trace('_reverse_impl_fn()');
    const emptyIter = toAsyncIterable<T>([]);
    return _foldl((acc, e) => flip(cons, acc, e), emptyIter, iter);
}

export function _reverse<T>(iter: AsyncIterable<T>) {
    logger.trace('_reverse()');
    return new AsyncIterator_(toAsyncIterable(_reverse_impl_fn(iter)));
}
