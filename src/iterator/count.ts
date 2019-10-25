import { getLogger } from '../logger';

const logger = getLogger('iterator/count');

async function _count_impl_fn<T>(iter: AsyncIterable<T>, current: number = 0): Promise<number> {
    logger.trace('_count_impl_fn()');
    const it = iter[Symbol.asyncIterator]();
    const { done } = await it.next();

    logger.debug('done    =', done);
    logger.debug('current =', current);

    if (done) {
        return current;
    }

    return _count_impl_fn(iter, current + 1);
}

export function _count<T>(iter: AsyncIterable<T>) {
    logger.trace('_count()');
    return _count_impl_fn(iter);
}
