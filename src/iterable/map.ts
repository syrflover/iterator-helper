import { IterableHelper } from '../iterable';
import { logger } from '../logger';

export class IterableMap<T, U> implements IterableIterator<T> {
    constructor(iter: Iterable<T>, fn: (elem: T) => U) {
        logger.trace('IterableMap', 'constructor()');

        this.fn = fn;
        this._iter = iter;
    }

    public [Symbol.iterator]() {
        logger.trace('IterableMap', '[Symbol.iterator]()');
        return this;
    }

    public next() {
        logger.trace('IterableMap', 'next()');
        const { done, value: v } = this._iter[Symbol.iterator]().next();

        const value = !done ? this.fn(v) : v;

        logger.debug('done  =', done);
        logger.debug('value =', value);

        return {
            done,
            value,
        };
    }

    private _iter: Iterable<T>;

    private fn: (elem: T) => U;
}

export function _map<T, U>(iter: Iterable<T>, fn: (elem: T) => U) {
    logger.trace('iterable/map', '_map()');
    return new IterableHelper<U>(new IterableMap<T, U>(iter, fn));
}
