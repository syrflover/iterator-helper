import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

import { Flatten } from '../types/flatten';

import { isIterable } from '../types/guard/isIterable';
import { isAsyncIterable } from '../types/guard/isAsyncIterable';

import { next_async } from './lib/next';

const logger = getLogger('iterator/flatten');

async function* _flatten_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<Flatten<T>> {
    logger.trace('_flatten_impl_fn()');
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
    logger.trace('_flatten()');
    return (new AsyncIterator_(_flatten_impl_fn(iter)) as unknown) as ToAsyncIterator<Flatten<T>>;
}
