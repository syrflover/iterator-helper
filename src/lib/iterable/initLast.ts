import { pair, Pair } from '../../types/pair';

import { toAsyncIterable } from '../iterable';
import { next_async } from './next';
import { append } from './append';
import { init } from './init';

export async function initLast<T>(
    iter: AsyncIterable<T>,
    last: T | undefined = undefined,
    init_cloned = toAsyncIterable<T>([]),
): Promise<Pair<AsyncIterable<T>, T | undefined>> {
    const { done, value } = await next_async(iter);

    if (done) {
        return pair(init(init_cloned), last);
    }

    return initLast(iter, value, append(value, init_cloned));
}
