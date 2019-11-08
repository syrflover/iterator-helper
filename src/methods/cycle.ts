import { getLogger } from '../logger.ts';

const logger = getLogger('iterator/cycle');

async function* _cycle_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<T> {
    const r: T[] = [];

    for await (const elem of iter) {
        yield elem;
        r.push(elem);
    }

    while (true) {
        yield* r;
    }
}

export function _cycle<T>(iter: AsyncIterable<T>) {
    logger.trace('_cycle()');
    return _cycle_impl_fn(iter);
}
