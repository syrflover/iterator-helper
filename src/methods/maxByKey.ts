import { getLogger } from '../logger';

import { KeyFn } from '../types/fn/key';
import { CompareFn } from '../types/fn/cmp';

import { next_async } from '../lib/iterable/next';

import { maxBy } from '../lib/cmp';
import { _curry, Curry2 } from '../lib/curry';

import { _foldl } from './foldl';

const logger = getLogger('iterator/maxByKey');

async function _max_by_key_impl_fn<T, K>(iter: AsyncIterable<T>, cmpFn: CompareFn<K>, keyFn: KeyFn<T, K>): Promise<T | undefined> {
    logger.trace('_max_by_key_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl(async (acc, e) => maxBy(keyFn, cmpFn, acc, e), value, iter);
}

export interface MaxByKey {
    <T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
    <T, K>(keyFn: KeyFn<T, K>): Curry2<CompareFn<K>, AsyncIterable<T>, Promise<T | undefined>>;
}

export const _maxByKey: MaxByKey = _curry(<T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, iter: AsyncIterable<T>) => {
    logger.trace('_maxByKey()');
    return _max_by_key_impl_fn(iter, cmpFn, keyFn);
});
