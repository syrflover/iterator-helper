import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/filter');

async function* _filter_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
    logger.info('_filter_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return;
    }

    const condition = await predicate(value);

    logger.debug('condition =', condition);

    if (condition) {
        yield value;
    }

    yield* _filter_impl_fn(iter, predicate);
}

export interface Filter {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _filter: Filter = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.info('_filter()');
    return _filter_impl_fn(iter, predicate);
});
