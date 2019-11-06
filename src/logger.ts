import * as log from 'https://deno.land/std/log/mod.ts';

export const getLogger = (label: string) => {
    const logger = log.getLogger(label);
    return logger;
};
