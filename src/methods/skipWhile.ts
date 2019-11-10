import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/mod.ts';

import { next_async, prepend } from '../lib/iterable/mod.ts';
import { _curry } from '../lib/utils/mod.ts';

const logger = getLogger('methods/dropWhile');

async function* _skip_while_impl_fn<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('skipWhile()');
    while (true) {
        const { done, value } = await next_async(iter);

        logger.debug('done      =', done);
        logger.debug('value     =', value);

        if (done) {
            return;
        }

        const condition = await predicate(value);

        logger.debug('condition =', condition);

        if (!condition) {
            yield* prepend(value, iter);
            return;
        }
    }
}

export interface SkipWhile {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const skipWhile: SkipWhile = _curry(_skip_while_impl_fn);
