import { getLogger } from '../logger.ts';

import { _foldl } from './foldl.ts';

import { toAsyncIterable } from '../lib/iterable.ts';

import { prepend } from '../lib/iterable/prepend.ts';

import { flip } from '../lib/flip.ts';

const logger = getLogger('iterator/reverse');

async function* _reverse_impl_fn<T>(iter: AsyncIterable<T>) {
    logger.info('_reverse_impl_fn()');
    const emptyIter = toAsyncIterable<T>([]);
    yield* await _foldl((acc, e) => flip(prepend, acc, e), emptyIter, iter);
}

export function _reverse<T>(iter: AsyncIterable<T>) {
    logger.info('_reverse()');
    return _reverse_impl_fn(iter);
}
