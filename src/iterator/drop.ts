import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

const logger = getLogger('iterator/drop');

async function* _drop_impl_fn<T>(iter: AsyncIterable<T>, count: number, current: number = 1): AsyncIterable<T> {
    logger.trace('_drop()');
    const it = iter[Symbol.asyncIterator]();
    const { done } = await it.next();

    logger.debug('done    =', done);
    logger.debug('count   =', count);
    logger.debug('current =', current);

    if (done) {
        return;
    }

    if (current >= count) {
        yield* iter;
        return;
    }

    yield* _drop_impl_fn(iter, count, current + 1);
}

export function _drop<T>(count: number, iter: AsyncIterable<T>) {
    logger.trace('_drop()');
    return (new AsyncIterator_(_drop_impl_fn(iter, count)) as unknown) as ToAsyncIterator<T>;
}
