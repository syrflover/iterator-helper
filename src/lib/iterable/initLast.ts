import { pair, Pair } from '../../types/pair.ts';

import { foldl } from '../../methods/foldl.ts';

import { append } from './append.ts';
import { next_async } from './next.ts';
import { sequence } from './toAsyncIterable.ts';

export async function initLast<T>(
    iter: AsyncIterable<T>,
): Promise<Pair<AsyncIterable<T>, T | undefined>> {
    const { done, value } = await next_async(iter);

    if (done) {
        return pair(iter, undefined);
    }

    return foldl(([r, prev], elem) => pair(append(prev, r), elem), pair(sequence<T>([]), value), iter);
}
