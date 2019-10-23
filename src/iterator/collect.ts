import { logger } from '../logger';

export async function _collect<T>(iter: AsyncIterable<T>): Promise<T[]> {
    logger.trace('iterator/collect', '_collect()');
    const res: T[] = [];

    for await (const elem of iter) {
        res.push(elem);
    }

    return res;
}
