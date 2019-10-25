import { getLogger } from '../logger';

const logger = getLogger('iterator/count');

export async function _count<T>(iter: AsyncIterable<T>, r: number = 0): Promise<number> {
    logger.trace('_count()');
    const it = iter[Symbol.asyncIterator]();
    const { done } = await it.next();

    if (done) {
        return r;
    }

    return _count(iter, r + 1);
}
