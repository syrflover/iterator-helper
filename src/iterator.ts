import './array/iter';

import { logger } from './logger';

import { MapFn } from './types/fn/map';
import { PredicateFn } from './types/fn/predicate';

import { _collect } from './iterator/collect';
import { _count } from './iterator/count';
import { _enumerate } from './iterator/enumerate';
import { _map } from './iterator/map';
import { _filter } from './iterator/filter';
import { _forEach } from './iterator/forEach';
import { _find } from './iterator/find';
import { ForEachFn } from './types/fn/forEach';

export class IteratorHelper<T> implements AsyncIterableIterator<T> {
    constructor(iter: Iterable<T> | AsyncIterable<T>) {
        logger.trace('IteratorHelper', 'constructor()');
        if (Array.isArray(iter)) {
            logger.debug('typeof iter =', 'array');
            this._iter = iter.iter();
        } else {
            logger.debug('typeof iter =', 'iterable/asyncIterable');
            this._iter = {
                async *[Symbol.asyncIterator]() {
                    yield* iter;
                },
            };
        }
    }

    public [Symbol.asyncIterator]() {
        logger.trace('IteratorHelper', '[Symbol.iterator]()');
        return this;
    }

    public async next() {
        logger.trace('IteratorHelper', 'next()');
        const it = this._iter[Symbol.asyncIterator]();
        const { done, value } = await it.next();

        return {
            done,
            value,
        };
    }

    private readonly _iter: AsyncIterable<T>;

    public collect() {
        return _collect(this._iter);
    }

    public count() {
        return _count(this._iter);
    }

    public enumerate() {
        return _enumerate(this._iter);
    }

    public map<R>(fn: MapFn<T, R>) {
        return _map(this._iter, fn);
    }

    public filter(predicate: PredicateFn<T>) {
        return _filter(this._iter, predicate);
    }

    public forEach(fn: ForEachFn<T>) {
        return _forEach(this._iter, fn);
    }

    public find(predicate: PredicateFn<T>) {
        return _find(this._iter, predicate);
    }
}
