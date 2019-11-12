import { getLogger } from '../logger.ts';

import { Flatten } from '../types/mod.ts';
import { isIterable, isAsyncIterable } from '../types/guards/mod.ts';

const logger = getLogger('methods/flatten');

async function* _flatten_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<Flatten<T>> {
    logger.trace('flatten()');
    for await (const elem of iter) {
        logger.debug('element =', elem);

        if (isIterable(elem) || isAsyncIterable(elem)) {
            yield* elem;
        } else {
            yield elem as Flatten<T>;
        }
    }
}

export function flatten<T>(iter: AsyncIterable<T>): AsyncIterable<Flatten<T>> {
    return _flatten_impl_fn(iter);
}
