import { getLogger } from '../logger.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = getLogger('methods/take');

async function* _take_impl_fn<T>(limit: number, iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('take()');
    let current = 1;

    for await (const elem of iter) {
        if (current > limit) {
            return;
        }

        logger.debug('element   =', elem);

        yield elem;

        current += 1;
    }
}

export interface Take {
    <T>(limit: number, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(limit: number): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const take: Take = _curry(_take_impl_fn);
