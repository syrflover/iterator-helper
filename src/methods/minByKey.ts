import { getLogger } from '../logger.ts';

import { KeyFn } from '../types/fn/key.ts';
import { CompareFn } from '../types/fn/cmp.ts';

import { next_async } from '../lib/iterable/next.ts';

import { minBy } from '../lib/cmp.ts';
import { _curry, Curry2 } from '../lib/curry.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/minByKey');

async function _min_by_key_impl_fn<T, K>(iter: AsyncIterable<T>, cmpFn: CompareFn<K>, keyFn: KeyFn<T, K>): Promise<T | undefined> {
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl(async (acc, e) => minBy(keyFn, cmpFn, acc, e), value, iter);
}

export interface MinByKey {
    <T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
    <T, K>(keyFn: KeyFn<T, K>): Curry2<CompareFn<K>, AsyncIterable<T>, Promise<T | undefined>>;
}

export const _minByKey: MinByKey = _curry(<T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, iter: AsyncIterable<T>) => {
    logger.trace('_minByKey()');
    return _min_by_key_impl_fn(iter, cmpFn, keyFn);
});
