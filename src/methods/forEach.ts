import { getLogger } from '../logger.ts';

import { ForEachFn } from '../types/functions/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/forEach');

async function _for_each_impl_fn<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): Promise<void> {
    logger.trace('forEach()');
    for await (const elem of iter) {
        await fn(elem);
        logger.debug('element =', elem);
    }
}

export interface ForEach {
    <T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): Promise<void>;
    <T>(fn: ForEachFn<T>): (iter: AsyncIterable<T>) => Promise<void>;
}

export const forEach: ForEach = _curry(_for_each_impl_fn);
