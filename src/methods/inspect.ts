import type { ForEachFn } from '../types/functions/mod.ts';

import { getLogger } from '../logger.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/inspect');

async function* _inspect_impl_fn<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('inspect()');
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

export const inspect: Inspect = _curry(_inspect_impl_fn);
