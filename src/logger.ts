// import * as log from 'https://deno.land/std/log/mod.ts';
import { Logger, LogRecord } from 'https://deno.land/std/log/logger.ts';
import { LogLevels, getLevelByName as getLevelByName_ } from 'https://deno.land/std/log/levels.ts';
import { BaseHandler } from 'https://deno.land/std/log/handlers.ts';
import { blue, cyan, green, yellow, red, bold } from 'https://deno.land/std/fmt/colors.ts';

const getLevelByName = (levelName: 'NOTSET' | 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' = 'NOTSET') => {
    switch (levelName || 'NOTSET') {
        /* case 'NONE':
            return -1;
        case 'TRACE':
            return 5; */
        default:
            return getLevelByName_(levelName as any);
    }
};

class LogHandler extends BaseHandler {
    constructor(levelName: 'NOTSET' | 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL') {
        super(levelName as any);
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
            case 5: // trace
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
        /* eslint-disable-next-line */
        console.log(msg);
    }
}

const logEnable = Deno.args.some((e) => e.includes('ITER_HELPER_LOG'));
const LOG_LEVEL = logEnable ? 'NOTSET' : 'ERROR';

export const getLogger = (label: string) => {
    const logger = new Logger(LOG_LEVEL, [new LogHandler(LOG_LEVEL)]);
    return {
        trace: (msg: string, ...args: unknown[]) => logger._log(LogLevels.NOTSET, label, msg, ...args),
        debug: (msg: string, ...args: unknown[]) => logger._log(LogLevels.DEBUG, label, msg, ...args),
        info: (msg: string, ...args: unknown[]) => logger._log(LogLevels.INFO, label, msg, ...args),
        warning: (msg: string, ...args: unknown[]) => logger._log(LogLevels.WARNING, label, msg, ...args),
        error: (msg: string, ...args: unknown[]) => logger._log(LogLevels.ERROR, label, msg, ...args),
        critical: (msg: string, ...args: unknown[]) => logger._log(LogLevels.CRITICAL, label, msg, ...args),
    };
};
