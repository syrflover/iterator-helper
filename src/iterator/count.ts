import { logger } from '../logger';

export function _count<T>(iter: Iterable<T>) {
    logger.trace('iterator/count', '_count()');
    let count = 0;

    for (const _ of iter) {
        count += 1;
    }

    return count;
}
