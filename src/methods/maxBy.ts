import { getLogger } from '../logger.ts';

import { CompareFn } from '../types/functions/mod.ts';

import { _curry, id } from '../lib/utils/mod.ts';

import { maxByKey } from './maxByKey.ts';

const logger = await getLogger('methods/maxBy');

export interface MaxBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const maxBy: MaxBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('maxBy()');
    return maxByKey(id, fn, iter);
});
