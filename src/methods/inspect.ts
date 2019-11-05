import { getLogger } from '../logger';

import { ForEachFn } from '../types/fn/forEach';

import { next_async } from '../lib/iterable/next';

import { _curry } from '../lib/curry';

const logger = getLogger('iterator/inspect');

async function* _inspect_impl_fn<T>(iter: AsyncIterable<T>, fn: ForEachFn<T>): AsyncIterable<T> {
    logger.trace('_inspect_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return;
    }

    await fn(value);

    yield value;

    yield* _inspect_impl_fn(iter, fn);
}

export interface Inspect {
    <T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: ForEachFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _inspect: Inspect = _curry(<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_inspect()');
    return _inspect_impl_fn(iter, fn);
});
