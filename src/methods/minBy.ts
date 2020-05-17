import { getLogger } from '../logger.ts';

import { CompareFn } from '../types/functions/mod.ts';

import { _curry, id } from '../lib/utils/mod.ts';

import { minByKey } from './minByKey.ts';

const logger = await getLogger('methods/minBy');

export interface MinBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const minBy: MinBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('minBy()');
    return minByKey(id, fn, iter);
});
