import { getLogger } from 'log4js';

export const logger = getLogger('iterator-helper');

logger.level = globalThis?.process?.env?.ITER_HELPER_LOG_LEVEL ?? '';
