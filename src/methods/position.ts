import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/position');

async function _position_impl_fn<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>): Promise<number | undefined> {
    let pos = 0;

    for await (const elem of iter) {
        const condition = await fn(elem);

        if (condition) {
            return pos;
        }

        pos += 1;
    }
}

export interface Position {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<number | undefined>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<number | undefined>;
}

export const _position: Position = _curry(<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_position()');
    return _position_impl_fn(iter, fn);
});
