import { pair, Pair } from '../../types/pair.ts';

import { toAsyncIterable, sequence } from '../iterable.ts';
import { next_async } from './next.ts';
import { append } from './append.ts';
import { _foldl } from '../../methods/foldl.ts';

export async function initLast<T>(
    iter: AsyncIterable<T>,
    last: T | undefined = undefined,
): Promise<Pair<AsyncIterable<T>, T | undefined>> {
    const { done, value } = await next_async(iter);

    if (done) {
        return pair(iter, last);
    }

    return _foldl(([r, prev], elem) => pair(append(prev, r), elem), pair(sequence<T>([]), value), iter);
}
