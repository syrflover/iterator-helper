import { getLogger } from '../logger.ts';

const logger = getLogger('methods/cycle');

async function* _cycle_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('cycle()');
    const r: T[] = [];

    for await (const elem of iter) {
        yield elem;
        r.push(elem);
    }

    while (true) {
        yield* r;
    }
}

export function cycle<T>(iter: AsyncIterable<T>) {
    return _cycle_impl_fn(iter);
}
