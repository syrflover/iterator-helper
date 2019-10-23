import { FoldFn } from '../types/fn/fold';

import { _fold } from './fold';

export async function _fold1<T>(iter: AsyncIterable<T>, fn: FoldFn<T>) {
    const it = iter[Symbol.asyncIterator]();
    const { done, value: head } = await it.next();

    if (done) {
        throw new Error('');
    }

    return _fold(iter, head, fn);
}
