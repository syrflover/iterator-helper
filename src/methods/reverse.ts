import { getLogger } from '../logger.ts';

import { foldl } from './foldl.ts';

import { prepend, sequence } from '../lib/iterable/mod.ts';
import { flip } from '../lib/utils/mod.ts';

const logger = getLogger('methods/reverse');

async function* _reverse_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('reverse()');
    const emptyIter = sequence<T>([]);
    yield* await foldl((acc, e) => flip(prepend, acc, e), emptyIter, iter);
}

export function reverse<T>(iter: AsyncIterable<T>) {
    return _reverse_impl_fn(iter);
}
