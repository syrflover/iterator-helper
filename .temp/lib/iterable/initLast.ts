import { pair, Pair } from '../../types/pair';

import { fold } from '../../methods/fold';

import { append } from './append';
import { next_async } from './next';
import { sequence } from './toAsyncIterable';

export async function initLast<T>(iter: AsyncIterable<T>): Promise<Pair<AsyncIterable<T>, T | undefined>> {
    const { done, value } = await next_async(iter);

    if (done) {
        return pair(iter, undefined);
    }

    return fold(([r, prev], elem) => pair(append(prev, r), elem), pair(sequence<T>([]), value), iter);
}
