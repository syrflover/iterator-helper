import { IteratorHelper } from '../iterator';
import { logger } from '../logger';

import { MapFn } from '../types/map';

export class IteratorMap<T, R> implements AsyncIterableIterator<T> {
    constructor(iter: AsyncIterable<T>, fn: MapFn<T, R>) {
        logger.trace('IteratorMap', 'constructor()');

        this.fn = fn;
        this._iter = iter;
    }

    public [Symbol.asyncIterator]() {
        logger.trace('IteratorMap', '[Symbol.iterator]()');
        return this;
    }

    public async next() {
        logger.trace('IteratorMap', 'next()');
        const it = this._iter[Symbol.asyncIterator]();
        const { done, value: v } = await it.next();

        const value = !done ? await this.fn(v) : v;

        logger.debug('done      =', done);
        logger.debug('value     =', v);
        logger.debug('fn(value) =', value);

        return {
            done,
            value,
        };
    }

    private readonly _iter: AsyncIterable<T>;

    private fn: MapFn<T, R>;
}

export function _map<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, R>) {
    logger.trace('iterator/map', '_map()');
    return new IteratorHelper<R>(new IteratorMap<T, R>(iter, fn));
}
