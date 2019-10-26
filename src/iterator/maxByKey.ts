import { getLogger } from '../logger';

import { ByKeyFn } from '../types/fn/byKey';
import { CompareFn } from '../types/fn/cmp';

import { cmp, maxBy } from '../lib/cmp';
import { next_async } from '../lib/iterable/next';

import { _foldl } from './foldl';

const logger = getLogger('iterator/maxByKey');

async function _max_by_key_impl_fn<T>(iter: AsyncIterable<T>, keyFn: ByKeyFn<T>, cmpFn: CompareFn<T>): Promise<T | undefined> {
    logger.trace('_max_by_key_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl(async (acc, e) => maxBy(await keyFn(acc), await keyFn(e), cmpFn), value, iter);
}

export function _maxByKey<T>(cmpFn: CompareFn<T> | undefined, keyFn: ByKeyFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_maxByKey()');
    return _max_by_key_impl_fn(iter, keyFn, cmpFn ?? cmp);
}
