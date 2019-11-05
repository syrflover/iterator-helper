import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

import { next_async } from '../lib/iterable/next';

import { curry } from '../lib/curry';

const logger = getLogger('iterator/takeWhile');

async function* _take_while_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
    logger.trace('_take_while_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return;
    }

    const condition = await predicate(value);

    logger.debug('condition =', condition);

    if (!condition) {
        return;
    }

    yield value;

    yield* _take_while_impl_fn(iter, predicate);
}

export interface TakeWhile {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _takeWhile: TakeWhile = curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_takeWhile()');
    return _take_while_impl_fn(iter, predicate);
});