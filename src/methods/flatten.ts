import { getLogger } from '../logger.ts';

import { Flatten } from '../types/flatten.ts';

import { isIterable } from '../types/guard/isIterable.ts';
import { isAsyncIterable } from '../types/guard/isAsyncIterable.ts';

const logger = getLogger('iterator/flatten');

async function* _flatten_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<Flatten<T>> {
    for await (const elem of iter) {
        logger.debug('element =', elem);

        if (isIterable(elem) || isAsyncIterable(elem)) {
            yield* elem;
        } else {
            yield elem as Flatten<T>;
        }
    }
}

export function _flatten<T>(iter: AsyncIterable<T>) {
    logger.trace('_flatten()');
    return _flatten_impl_fn(iter);
}
