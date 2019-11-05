import { getLogger } from '../logger';

import { ByKeyFn } from '../types/fn/byKey';
import { CompareFn } from '../types/fn/cmp';

import { next_async } from '../lib/iterable/next';

import { maxBy } from '../lib/cmp';
import { curry, Curry2 } from '../lib/curry';

import { _foldl } from './foldl';

const logger = getLogger('iterator/maxByKey');

async function _max_by_key_impl_fn<T>(iter: AsyncIterable<T>, cmpFn: CompareFn<T>, keyFn: ByKeyFn<T>): Promise<T | undefined> {
    logger.trace('_max_by_key_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl(async (acc, e) => maxBy(await keyFn(acc), await keyFn(e), cmpFn), value, iter);
}

export interface MaxByKey {
    <T>(keyFn: ByKeyFn<T>, cmpFn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(keyFn: ByKeyFn<T>, cmpFn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
    <T>(keyFn: ByKeyFn<T>): Curry2<CompareFn<T>, AsyncIterable<T>, Promise<T | undefined>>;
}

export const _maxByKey: MaxByKey = curry(<T>(keyFn: ByKeyFn<T>, cmpFn: CompareFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_maxByKey()');
    return _max_by_key_impl_fn(iter, cmpFn, keyFn);
});
