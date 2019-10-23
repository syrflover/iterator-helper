import './array/iter';

import { logger } from './logger';

import { MapFn } from './types/fn/map';
import { PredicateFn } from './types/fn/predicate';
import { FoldFn } from './types/fn/fold';

import { _collect } from './iterator/collect';
import { _count } from './iterator/count';
import { _enumerate } from './iterator/enumerate';
import { _map } from './iterator/map';
import { _filter } from './iterator/filter';
import { _forEach } from './iterator/forEach';
import { _find } from './iterator/find';
import { ForEachFn } from './types/fn/forEach';
import { _take } from './iterator/take';
import { _fold } from './iterator/fold';
import { _fold1 } from './iterator/fold1';

export class IteratorHelper<T> implements AsyncIterableIterator<T> {
    constructor(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
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
        logger.trace('IteratorHelper', '[Symbol.asyncIterator]()');
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

    /**
     * ### Strict Method
     */
    public collect() {
        return _collect(this._iter);
    }

    /**
     * ### Strict Method
     */
    public count() {
        return _count(this._iter);
    }

    /**
     * ### Lazy Method
     */
    public enumerate() {
        return _enumerate(this._iter);
    }

    /**
     * ### Lazy Method
     */
    public map<R>(fn: MapFn<T, R>) {
        return _map(this._iter, fn);
    }

    /**
     * ### Lazy Method
     */
    public filter(predicate: PredicateFn<T>) {
        return _filter(this._iter, predicate);
    }

    /**
     * ### Lazy Method
     */
    public forEach(fn: ForEachFn<T>) {
        return _forEach(this._iter, fn);
    }

    /**
     * ### Strict Method
     */
    public find(predicate: PredicateFn<T>) {
        return _find(this._iter, predicate);
    }

    /**
     * ### Strict Method
     */
    public fold(init: T | Promise<T>, fn: FoldFn<T>) {
        return _fold(this._iter, init, fn);
    }

    public fold1(fn: FoldFn<T>) {
        return _fold1(this._iter, fn);
    }

    /**
     * ### Strict Method
     */
    public take(n: number) {
        return _take(this._iter, n);
    }
}
