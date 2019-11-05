import { getLogger } from '../logger';

import { _foldl } from './foldl';

import { toAsyncIterable } from '../lib/iterable';

import { prepend } from '../lib/iterable/prepend';

import { flip } from '../lib/flip';

const logger = getLogger('iterator/reverse');

async function* _reverse_impl_fn<T>(iter: AsyncIterable<T>) {
    logger.trace('_reverse_impl_fn()');
    const emptyIter = toAsyncIterable<T>([]);
    yield* await _foldl((acc, e) => flip(prepend, acc, e), emptyIter, iter);
}

export function _reverse<T>(iter: AsyncIterable<T>) {
    logger.trace('_reverse()');
    return _reverse_impl_fn(iter);
}
