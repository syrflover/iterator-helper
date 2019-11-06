import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/takeWhile');

async function* _take_while_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
    logger.info('_take_while_impl_fn()');
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

export const _takeWhile: TakeWhile = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.info('_takeWhile()');
    return _take_while_impl_fn(iter, predicate);
});
