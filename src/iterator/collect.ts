import { logger } from '../logger';

export function _collect<T>(iter: Iterable<T>): T[] {
    logger.trace('iterator/collect', '_collect()');
    const res: T[] = [];

    for (const elem of iter) {
        res.push(elem);
    }

    return res;
}
