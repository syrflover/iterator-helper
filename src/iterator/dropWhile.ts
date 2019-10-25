import { getLogger } from '../logger';

import { Iterator } from '../iterator';

import { PredicateFn } from '../types/fn/predicate';
import { cons } from './lib/cons';
import { toAsyncIterable } from '../lib/toIterable';

const logger = getLogger('iterator/dropWhile');

async function _dropWhileRecursively<T>(
    predicate: PredicateFn<T>,
    iter: AsyncIterable<T>,
): Promise<AsyncIterable<T>> {
    const it = iter[Symbol.asyncIterator]();
    const { done, value } = await it.next();

    if (done) {
        return toAsyncIterable([]);
    }

    const condition = await predicate(value);

    if (!condition) {
        return cons(value, iter);
    }

    return _dropWhileRecursively(predicate, iter);
}

export function _dropWhile<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): Iterator<T> {
    logger.trace('_dropWhile()');
    return new Iterator<T>(toAsyncIterable<T>(_dropWhileRecursively<T>(predicate, iter)));
}
