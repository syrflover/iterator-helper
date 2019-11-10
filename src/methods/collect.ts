import { getLogger } from '../logger.ts';

import { foldl } from './foldl.ts';

const logger = getLogger('methods/collect');

export function collect<T>(iter: AsyncIterable<T>) {
    logger.trace('collect()');
    return foldl((acc: T[], e: T) => [...acc, e], [] as T[], iter);
}
