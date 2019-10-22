import { IteratorHelper } from '../iterator';
import { logger } from '../logger';

export class IteratorMap<T, U> implements IterableIterator<T> {
    constructor(iter: Iterable<T>, fn: (elem: T) => U) {
        logger.trace('IteratorMap', 'constructor()');

        this.fn = fn;
        this._iter = iter;
    }

    public [Symbol.iterator]() {
        logger.trace('IteratorMap', '[Symbol.iterator]()');
        return this;
    }

    public next() {
        logger.trace('IteratorMap', 'next()');
        const { done, value: v } = this._iter[Symbol.iterator]().next();

        const value = !done ? this.fn(v) : v;

        logger.debug('done  =', done);
        logger.debug('value =', value);

        return {
            done,
            value,
        };
    }

    private readonly _iter: Iterable<T>;

    private fn: (elem: T) => U;
}

export function _map<T, U>(iter: Iterable<T>, fn: (elem: T) => U) {
    logger.trace('iterator/map', '_map()');
    return new IteratorHelper<U>(new IteratorMap<T, U>(iter, fn));
}
