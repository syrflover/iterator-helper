import { getLogger } from '../logger';

import { FoldFn } from '../types/fn/fold';

const logger = getLogger('iterator/fold');

// (b -> a -> b) -> b -> t a -> b
export async function _foldl<A, B>(fn: FoldFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) {
    logger.trace('_fold()');
    logger.debug('init        =', init);
    let accumulator = await init;

    for await (const elem of iter) {
        accumulator = await fn(accumulator, elem);
        logger.debug('accumulator =', accumulator);
        logger.debug('elem        =', elem);
    }

    return accumulator;
}
