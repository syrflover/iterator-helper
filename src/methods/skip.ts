import { getLogger } from '../logger.ts';

import { next_async } from '../lib/iterable/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/skip');

async function* _skip_impl_fn<T>(count: number, iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('skip()');
    let current = 1;

    while (true) {
        const { done } = await next_async(iter);

        logger.debug('done    =', done);
        logger.debug('count   =', count);
        logger.debug('current =', current);

        if (done) {
            return;
        }

        if (current >= count) {
            yield* iter;
            return;
        }

        current += 1;
    }
}

export interface Skip {
    <T>(count: number, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(count: number): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const skip: Skip = _curry(_skip_impl_fn);
