// import * as log from 'https://deno.land/std/log/mod.ts';
import { Logger, LogRecord } from 'https://deno.land/std/log/logger.ts';
import { LogLevel, getLevelByName as getLevelByName_ } from 'https://deno.land/std/log/levels.ts';
import { BaseHandler } from 'https://deno.land/std/log/handlers.ts';
import { blue, cyan, green, yellow, red, bold } from 'https://deno.land/std/fmt/colors.ts';

const getLevelByName = (levelName: string) => {
    switch (levelName) {
        case 'NONE' || '':
            return -1;
        case 'TRACE':
            return 5;
        default:
            return getLevelByName_(levelName);
    }
};

class LogHandler extends BaseHandler {
    constructor(levelName: string) {
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
        const {
            datetime, level, msg, args,
        } = logRecord;
        const time = datetime.toISOString();

        const stringify = (v: any) => {
            try {
                const str = JSON.stringify(v);
                return str.replace(/(^"|"$)/g, '');
            } catch {
                return v;
            }
        };

        const to = (t: string, lv: string, m: string, a: unknown[]) =>
            `[${t}] ${lv} ${m} ${a.map((e) => stringify(e)).join(' ')}`;

        switch (level) {
            case 5: // trace
                return to(time, blue('[TRACE]'), msg, args);
            case LogLevel.DEBUG:
                return to(time, cyan('[DEBUG]'), msg, args);
            case LogLevel.INFO:
                return to(time, green('[INFO]'), msg, args);
            case LogLevel.WARNING:
                return to(time, yellow('[WARNING]'), msg, args);
            case LogLevel.ERROR:
                return to(time, red('[ERROR]'), msg, args);
            case LogLevel.CRITICAL:
                return to(time, bold(red('[CRITICAL]')), msg, args);
            default:
                return to(time, '[NONE]', msg, args);
        }
    }

    public log(msg: string): void {
        /* eslint-disable-next-line */
        console.log(msg);
    }
}

const logEnable = Deno.args.some((e) => e.includes('ITER_HELPER_LOG'));
const LOG_LEVEL = logEnable ? 'NOTSET' : 'NONE';

export const getLogger = (label: string) => {
    const logger = new Logger(LOG_LEVEL, [new LogHandler(LOG_LEVEL)]);
    return {
        trace: (msg: string, ...args: unknown[]) => logger._log(5, label, msg, ...args),
        debug: (msg: string, ...args: unknown[]) => logger._log(LogLevel.DEBUG, label, msg, ...args),
        info: (msg: string, ...args: unknown[]) => logger._log(LogLevel.INFO, label, msg, ...args),
        warning: (msg: string, ...args: unknown[]) => logger._log(LogLevel.WARNING, label, msg, ...args),
        error: (msg: string, ...args: unknown[]) => logger._log(LogLevel.ERROR, label, msg, ...args),
        critical: (msg: string, ...args: unknown[]) => logger._log(LogLevel.CRITICAL, label, msg, ...args),
    };
};
