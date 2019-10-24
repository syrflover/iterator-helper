import './types/global';

import { getLogger } from './logger';

import { isArrayLike } from './lib/isArrayLike';
import { toIterable } from './lib/toIterable';

import { ForEachFn } from './types/fn/forEach';
import { FoldFn } from './types/fn/fold';
import { MapFn } from './types/fn/map';
import { PredicateFn } from './types/fn/predicate';

import { _collect } from './iterator/collect';
import { _count } from './iterator/count';
import { _enumerate } from './iterator/enumerate';
import { _map } from './iterator/map';
import { _filter } from './iterator/filter';
import { _forEach } from './iterator/forEach';
import { _find } from './iterator/find';
import { _take } from './iterator/take';
import { _foldl } from './iterator/foldl';
import { _foldl1 } from './iterator/foldl1';
import { _product } from './iterator/product';
import { _reverse } from './iterator/reverse';
import { _sum } from './iterator/sum';

const logger = getLogger('iterator');

export type ToIterator<Type> = Type extends number
    ? Iterator<Type>
    : Omit<Iterator<Type>, 'sum' | 'product'>;

export class Iterator<T> implements AsyncIterableIterator<T> {
    constructor(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
        logger.trace('constructor()');
        const it = isArrayLike(iter) ? toIterable(iter) : iter;

        this._iter = {
            async *[Symbol.asyncIterator]() {
                yield* it;
            },
        };
    }

    public [Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');
        return this;
    }

    public async next() {
        logger.trace('next()');
        const it = this._iter[Symbol.asyncIterator]();
        const { done, value } = await it.next();

        return {
            done,
            value,
        };
    }

    private readonly _iter: AsyncIterable<T>;

    public collect() {
        logger.trace('collect()');
        return _collect(this._iter);
    }

    public count() {
        logger.trace('count()');
        return _count(this._iter);
    }

    public enumerate() {
        logger.trace('enumerate()');
        return _enumerate(this._iter);
    }

    public filter(predicate: PredicateFn<T>) {
        logger.trace('filter()');
        return _filter(this._iter, predicate);
    }

    public find(predicate: PredicateFn<T>) {
        logger.trace('find()');
        return _find(this._iter, predicate);
    }

    public foldl<B>(init: B | Promise<B>, fn: FoldFn<T, B>) {
        logger.trace('fold()');
        return _foldl(this._iter, init, fn);
    }

    public foldl1(fn: FoldFn<T, T>) {
        logger.trace('fold1()');
        return _foldl1(this._iter, fn);
    }

    public forEach(fn: ForEachFn<T>) {
        logger.trace('forEach()');
        return _forEach(this._iter, fn);
    }

    public map<R>(fn: MapFn<T, R>) {
        logger.trace('map()');
        return _map(this._iter, fn);
    }

    public product() {
        logger.trace('product()');
        return _product(this._iter as any);
    }

    public reverse() {
        logger.trace('reverse()');
        return _reverse(this._iter);
    }

    public sum() {
        logger.trace('sum()');
        return _sum(this._iter as any);
    }

    public take(count: number) {
        logger.trace('take()');
        return _take(this._iter, count);
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.trace('iterator()');
    return new Iterator<T>(iter) as ToIterator<T>;
}
