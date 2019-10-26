import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

import { PredicateFn } from '../types/fn/predicate';

import { next_async } from './lib/next';

const logger = getLogger('iterator/filter');

async function* _filter_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
    logger.trace('_filter_impl_fn()');
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

export function _filter<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_filter()');
    return (new AsyncIterator_(_filter_impl_fn(iter, predicate)) as unknown) as ToAsyncIterator<T>;
}
