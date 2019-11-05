import { getLogger } from '../logger';

import { next_async } from '../lib/iterable/next';

import { curry } from '../lib/curry';

const logger = getLogger('iterator/nth');

async function _nth_impl_fn<T>(iter: AsyncIterable<T>, n: number, current: number = 0): Promise<T | undefined> {
    logger.trace('_nth_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done ?? current > n) {
        return;
    }

    if (n === current) {
        return value;
    }

    return _nth_impl_fn(iter, n, current + 1);
}

export interface Nth {
    <T>(n: number, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(n: number): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const _nth: Nth = curry(<T>(n: number, iter: AsyncIterable<T>) => {
    logger.trace('_nth()');
    return _nth_impl_fn(iter, n);
});
