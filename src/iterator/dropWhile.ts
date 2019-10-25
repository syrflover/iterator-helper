import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

import { PredicateFn } from '../types/fn/predicate';
import { cons } from './lib/cons';
import { toAsyncIterable } from '../lib/toIterable';

const logger = getLogger('iterator/dropWhile');

async function* _drop_while_impl_fn<T>(
    predicate: PredicateFn<T>,
    iter: AsyncIterable<T>,
): AsyncIterable<T> {
    logger.trace('_drop_while_impl_fn()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value } = await it.next();

    if (done) {
        yield* toAsyncIterable([]);
        return;
    }
    const condition = await predicate(value);

    if (!condition) {
        yield* cons(value, iter);
        return;
    }
    yield* _drop_while_impl_fn(predicate, iter);
}

export function _dropWhile<T>(
    predicate: PredicateFn<T>,
    iter: AsyncIterable<T>,
): AsyncIterator_<T> {
    logger.trace('_dropWhile()');
    return new AsyncIterator_<T>(_drop_while_impl_fn<T>(predicate, iter));
}
