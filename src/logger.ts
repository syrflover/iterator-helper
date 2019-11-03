/* eslint-disable-next-line */
import *  as l from 'log4js';

const LOG_LEVEL = globalThis?.process?.env?.ITER_HELPER_LOG_LEVEL ?? '';

export const getLogger = (label: string) => {
    const logger = l.getLogger(label);
    logger.level = LOG_LEVEL;

    return logger;
};
