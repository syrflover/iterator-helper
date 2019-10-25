import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

import { PredicateFn } from '../types/fn/predicate';

import { cons } from './lib/cons';
import { next } from './lib/next';

const logger = getLogger('iterator/dropWhile');

async function* _drop_while_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
    logger.trace('_drop_while_impl_fn()');
    const { done, value } = await next(iter);

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return;
    }

    const condition = await predicate(value);

    logger.debug('condition =', condition);

    if (!condition) {
        yield* cons(value, iter);
        return;
    }
    yield* _drop_while_impl_fn(iter, predicate);
}

export function _dropWhile<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_dropWhile()');
    return (new AsyncIterator_(_drop_while_impl_fn(iter, predicate)) as unknown) as ToAsyncIterator<T>;
}
