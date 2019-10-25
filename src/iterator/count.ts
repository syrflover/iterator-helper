import { getLogger } from '../logger';

const logger = getLogger('iterator/count');

async function _count_impl_fn<T>(iter: AsyncIterable<T>, r: number = 0): Promise<number> {
    logger.trace('_count_impl_fn()');
    const it = iter[Symbol.asyncIterator]();
    const { done } = await it.next();

    if (done) {
        return r;
    }

    return _count_impl_fn(iter, r + 1);
}

export function _count<T>(iter: AsyncIterable<T>) {
    logger.trace('_count()');
    return _count_impl_fn(iter);
}
