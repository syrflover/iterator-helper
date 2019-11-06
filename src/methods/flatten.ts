import { getLogger } from '../logger.ts';

import { Flatten } from '../types/flatten.ts';

import { isIterable } from '../types/guard/isIterable.ts';
import { isAsyncIterable } from '../types/guard/isAsyncIterable.ts';

import { next_async } from '../lib/iterable/next.ts';

const logger = getLogger('iterator/flatten');

async function* _flatten_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<Flatten<T>> {
    logger.info('_flatten_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return;
    }

    if (isIterable(value) || isAsyncIterable(value)) {
        yield* value;
    } else {
        yield value as Flatten<T>;
    }

    yield* _flatten_impl_fn(iter);
}

export function _flatten<T>(iter: AsyncIterable<T>) {
    logger.info('_flatten()');
    return _flatten_impl_fn(iter);
}
