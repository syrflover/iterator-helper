import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { prepend } from '../lib/iterable/prepend.ts';
import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/dropWhile');

async function* _skip_while_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
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

export const _skipWhile: SkipWhile = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_dropWhile()');
    return _skip_while_impl_fn(iter, predicate);
});
