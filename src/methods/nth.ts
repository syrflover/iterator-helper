import { getLogger } from '../logger.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/nth');

async function _nth_impl_fn<T>(iter: AsyncIterable<T>, n: number): Promise<T | undefined> {
    let current = 0;

    for await (const elem of iter) {
        if (n === current) {
            return elem;
        }
        current += 1;
    }
}

export interface Nth {
    <T>(n: number, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(n: number): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const _nth: Nth = _curry(<T>(n: number, iter: AsyncIterable<T>) => {
    logger.trace('_nth()');
    return _nth_impl_fn(iter, n);
});
