import { logger } from './logger';

import { _count } from './iterator/count';
import { _collect } from './iterator/collect';
import { _map } from './iterator/map';
import { _filter } from './iterator/filter';

export class IteratorHelper<T> implements IterableIterator<T> {
    constructor(iter: Iterable<T>) {
        logger.trace('IteratorHelper', 'constructor()');
        if (Array.isArray(iter)) {
            this._iter = iter.iter();
        } else {
            this._iter = {
                *[Symbol.iterator]() {
                    yield* iter;
                },
            };
        }
    }

    protected readonly _iter: Iterable<T>;

    public [Symbol.iterator]() {
        logger.trace('IteratorHelper', '[Symbol.iterator]()');
        return this;
    }

    public next() {
        logger.trace('IteratorHelper', 'next()');
        const { done, value } = this._iter[Symbol.iterator]().next();

        return {
            done,
            value,
        };
    }

    public count() {
        return _count(this._iter);
    }

    public collect() {
        return _collect(this._iter);
    }

    public map<U>(fn: (elem: T) => U) {
        return _map(this._iter, fn);
    }

    public filter(predicate: (elem: T) => boolean) {
        return _filter(this._iter, predicate);
    }
}
