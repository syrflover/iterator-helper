import { getLogger } from '../logger.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/collect');

export function _collect<T>(iter: AsyncIterable<T>) {
    logger.trace('_collect()');
    return _foldl((acc: T[], e: T) => [...acc, e], [] as T[], iter);
    // return _collect_impl_fn(iter);
}
