import { logger } from '../logger';

import { FoldFn } from '../types/fn/fold';

export async function _fold<T>(iter: AsyncIterable<T>, init: T | Promise<T>, fn: FoldFn<T>) {
    logger.trace('iterator/fold', '_fold()');
    logger.debug('init        =', init);
    let accumulator = await init;

    for await (const elem of iter) {
        accumulator = await fn(accumulator, elem);
        logger.debug('accumulator =', accumulator);
        logger.debug('elem        =', elem);
    }

    return accumulator;
}