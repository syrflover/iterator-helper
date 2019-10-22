import { getLogger } from 'log4js';

export const logger = getLogger('iterator-helper');

if (
    globalThis.process &&
    globalThis.process.env &&
    globalThis.process.env.ITER_HELPER_LOG_LEVEL
) {
    logger.level = globalThis.process.env.ITER_HELPER_LOG_LEVEL;
}
