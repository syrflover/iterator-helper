import { getLogger } from '../logger.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/last');

// [a] -> Maybe a
export function _last<T>(iter: AsyncIterable<T>) {
    logger.trace('_last()');
    return _foldl((_, e) => e, undefined as T | undefined, iter);
}
