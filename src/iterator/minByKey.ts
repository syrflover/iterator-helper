import { getLogger } from '../logger';

import { ByKeyFn } from '../types/fn/byKey';
import { CompareFn } from '../types/fn/cmp';

import { next_async } from '../lib/iterable/next';

import { minBy } from '../lib/cmp';

import { _foldl } from './foldl';

const logger = getLogger('iterator/minByKey');

async function _min_by_key_impl_fn<T>(iter: AsyncIterable<T>, keyFn: ByKeyFn<T>, cmpFn: CompareFn<T>): Promise<T | undefined> {
    logger.trace('_min_by_key_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl(async (acc, e) => minBy(await keyFn(acc), await keyFn(e), cmpFn), value, iter);
}

export function _minByKey<T>(cmpFn: CompareFn<T>, keyFn: ByKeyFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_minByKey()');
    return _min_by_key_impl_fn(iter, keyFn, cmpFn);
}
