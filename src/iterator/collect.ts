import { getLogger } from '../logger';

const logger = getLogger('iterator/collect');

export async function _collect<T>(iter: AsyncIterable<T>): Promise<T[]> {
    logger.trace('_collect()');
    const res: T[] = [];

    for await (const elem of iter) {
        res.push(elem);
    }

    return res;
}
