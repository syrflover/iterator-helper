import { _map, IterableMap } from './iterable/map';
import { _collect } from './iterable/collect';
import { logger } from './logger';

export class IterableHelper<T> implements IterableIterator<T> {
    constructor(iter: Iterable<T>) {
        logger.trace('IterableHelper', 'constructor()');
        this._iter = iter;
    }

    protected _iter: Iterable<T>;

    public [Symbol.iterator]() {
        logger.trace('IterableHelper', '[Symbol.iterator]()');
        return this;
    }

    public next() {
        logger.trace('IterableHelper', 'next()');
        const { done, value } = this._iter[Symbol.iterator]().next();

        return {
            done,
            value,
        };
    }

    public collect() {
        return _collect(this._iter);
    }

    public map<U>(fn: (elem: T) => U) {
        //  return this;
        return _map(this._iter, fn);
    }
}
