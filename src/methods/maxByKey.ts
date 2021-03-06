import type { CompareFn, KeyFn } from '../types/functions/mod.ts';

import { getLogger } from '../logger.ts';

import { maxBy as compare_maxBy } from '../lib/compare/mod.ts';
import { next_async } from '../lib/iterable/mod.ts';
import { _curry, Curry2 } from '../lib/utils/mod.ts';

import { fold } from './fold.ts';

const logger = await getLogger('methods/maxByKey');

async function _max_by_key_impl_fn<T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, iter: AsyncIterable<T>): Promise<T | undefined> {
    logger.trace('maxByKey()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return fold(async (acc, e) => compare_maxBy(keyFn, cmpFn, acc, e), value, iter);
}

export interface MaxByKey {
    <T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
    <T, K>(keyFn: KeyFn<T, K>): Curry2<CompareFn<K>, AsyncIterable<T>, Promise<T | undefined>>;
}

export const maxByKey: MaxByKey = _curry(_max_by_key_impl_fn);
