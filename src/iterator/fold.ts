import { FoldFn } from '../types/fn/fold';

export async function _fold<T>(iter: AsyncIterable<T>, init: T | Promise<T>, fn: FoldFn<T>) {
    let accumulator = await init;

    for await (const elem of iter) {
        accumulator = await fn(accumulator, elem);
    }

    return accumulator;
}
