import { pair, Pair } from '../../types/pair.ts';

import { toAsyncIterable } from '../iterable.ts';
import { next_async } from './next.ts';
import { append } from './append.ts';
import { init } from './init.ts';

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
