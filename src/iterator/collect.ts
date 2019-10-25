import { getLogger } from '../logger';

const logger = getLogger('iterator/collect');

async function _collect_impl_fn<T>(iter: AsyncIterable<T>, r: T[] = []): Promise<T[]> {
    logger.trace('_collect_impl_fn()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value } = await it.next();

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return r;
    }

    return _collect_impl_fn(iter, [...r, value]);
}

export function _collect<T>(iter: AsyncIterable<T>): Promise<T[]> {
    logger.trace('_collect()');
    return _collect_impl_fn(iter);
}
