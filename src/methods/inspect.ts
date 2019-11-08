import { getLogger } from '../logger.ts';

import { ForEachFn } from '../types/fn/forEach.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/inspect');

async function* _inspect_impl_fn<T>(iter: AsyncIterable<T>, fn: ForEachFn<T>): AsyncIterable<T> {
    for await (const elem of iter) {
        await fn(elem);

        logger.debug('element =', elem);

        yield elem;
    }
}

export interface Inspect {
    <T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: ForEachFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _inspect: Inspect = _curry(<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_inspect()');
    return _inspect_impl_fn(iter, fn);
});
