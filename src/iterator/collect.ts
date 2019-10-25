import { getLogger } from '../logger';

const logger = getLogger('iterator/collect');

export async function _collect<T>(iter: AsyncIterable<T>, r: T[] = []): Promise<T[]> {
    logger.trace('_collect()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value } = await it.next();

    if (done) {
        return r;
    }

    return _collect(iter, [...r, value]);
}
