import { getLogger } from '../logger';
import { next_async } from '../lib/iterable/next';

const logger = getLogger('iterator/nth');

async function _nth_impl_fn<T>(iter: AsyncIterable<T>, index: number, current: number = 0): Promise<T | undefined> {
    logger.trace('_nth_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    if (index === current) {
        return value;
    }

    return _nth_impl_fn(iter, index, current + 1);
}

export function _nth<T>(index: number, iter: AsyncIterable<T>) {
    logger.trace('_nth()');
    return _nth_impl_fn(iter, index);
}
