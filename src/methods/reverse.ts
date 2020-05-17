import { getLogger } from '../logger.ts';

import { fold } from './fold.ts';

import { prepend, sequence } from '../lib/iterable/mod.ts';
import { flip } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/reverse');

async function* _reverse_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('reverse()');
    const emptyIter = sequence<T>([]);
    yield* await fold((acc, e) => flip(prepend, acc, e), emptyIter, iter);
}

export function reverse<T>(iter: AsyncIterable<T>): AsyncIterable<T> {
    return _reverse_impl_fn(iter);
}
