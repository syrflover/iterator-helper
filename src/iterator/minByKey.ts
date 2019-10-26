import { getLogger } from '../logger';

import { ByKeyFn } from '../types/fn/byKey';

import { cmp, minBy } from './lib/cmp';
import { next_async } from './lib/next';

import { _foldl } from './foldl';
import { _maxBy } from './maxBy';

const logger = getLogger('iterator/minByKey');

async function _min_by_key_impl_fn<T>(iter: AsyncIterable<T>, fn: ByKeyFn<T>): Promise<T | undefined> {
    logger.trace('_min_by_key_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl(async (acc, e) => minBy(await fn(acc), await fn(e), cmp), value, iter);
}

export function _minByKey<T>(fn: ByKeyFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_minByKey()');
    return _min_by_key_impl_fn(iter, fn);
}
