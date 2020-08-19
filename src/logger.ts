// import * as log from 'https://deno.land/std/log/mod.ts';
import { Logger, LogRecord } from 'https://deno.land/std/log/logger.ts';
import { LogLevels, getLevelByName } from 'https://deno.land/std/log/levels.ts';
import { BaseHandler } from 'https://deno.land/std/log/handlers.ts';
import { blue, cyan, green, yellow, red, bold } from 'https://deno.land/std/fmt/colors.ts';

import type { LevelName } from 'https://deno.land/std/log/levels.ts';

/* const getLevelByName = (levelName: string) => {
    switch (levelName) {
        case 'NONE':
            return -1;
        case 'TRACE':
            return 5;
        default:
            return getLevelByName_(levelName );
    }
}; */

class LogHandler extends BaseHandler {
    constructor(levelName: LevelName) {
        super(levelName);
        this.level = getLevelByName(levelName);
        this.levelName = levelName;
    }

    public handle(logRecord: LogRecord): void {
        if (this.level === -1) {
            return;
        }

        const msg = this.format(logRecord);
        return this.log(msg);
    }

    public format(logRecord: LogRecord): string {
        const { datetime, level, msg, args } = logRecord;
        const time = datetime.toISOString();

        const stringify = (v: any) => {
            try {
                const str = JSON.stringify(v);
                return str.replace(/(^"|"$)/g, '');
            } catch {
                return v;
            }
        };

        const to = (t: string, lv: string, m: string, a: unknown[]) => `${t} ${lv} ${m} ${a.map((e) => stringify(e)).join(' ')}`;

        switch (level) {
            case LogLevels.NOTSET: // trace
                return to(`[${time}]`, blue('[TRACE]'), msg, args);
            case LogLevels.DEBUG:
                return to(`[${time}]`, cyan('[DEBUG]'), msg, args);
            case LogLevels.INFO:
                return to(`[${time}]`, green('[INFO]'), msg, args);
            case LogLevels.WARNING:
                return to(`[${time}]`, yellow('[WARNING]'), msg, args);
            case LogLevels.ERROR:
                return to(`[${time}]`, red('[ERROR]'), msg, args);
            case LogLevels.CRITICAL:
                return to(`[${time}]`, bold(red('[CRITICAL]')), msg, args);
            default:
                return '';
        }
    }

    public log(msg: string): void {
        if (msg.length > 1) {
            /* eslint-disable-next-line */
            console.log(msg);
        }
    }
}

// const logEnable = Deno.args.some((e) => e.includes('ITER_HELPER_LOG'));
// const LOG_LEVEL = logEnable ? 'NOTSET' : 'ERROR';

export async function getLogger(label: string) {
    const toLogLevel = (s: string): LevelName => {
        switch (s) {
            case 'TRACE':
                return 'NOTSET';
            case '':
            case 'NONE':
                return 'ERROR';
            default:
                return s as LevelName;
        }
    };

    const isEnvGranted = (await Deno.permissions.query({ name: 'env' })).state === 'granted';
    const LOG_LEVEL_ = isEnvGranted ? Deno.env.get('LOG_LEVEL')?.trim().toUpperCase() ?? 'ERROR' : 'ERROR';
    const LOG_LEVEL = toLogLevel(LOG_LEVEL_);

    const logger = new Logger('logger', LOG_LEVEL, { handlers: [new LogHandler(LOG_LEVEL)] });

    return {
        trace: (msg: string, ...args: unknown[]) => (logger as any)._log(LogLevels.NOTSET, label, msg, ...args),
        debug: (msg: string, ...args: unknown[]) => (logger as any)._log(LogLevels.DEBUG, label, msg, ...args),
        info: (msg: string, ...args: unknown[]) => (logger as any)._log(LogLevels.INFO, label, msg, ...args),
        warning: (msg: string, ...args: unknown[]) => (logger as any)._log(LogLevels.WARNING, label, msg, ...args),
        error: (msg: string, ...args: unknown[]) => (logger as any)._log(LogLevels.ERROR, label, msg, ...args),
        critical: (msg: string, ...args: unknown[]) => (logger as any)._log(LogLevels.CRITICAL, label, msg, ...args),
    };
}
