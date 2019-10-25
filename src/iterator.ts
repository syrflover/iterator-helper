import './types/global';

import { getLogger } from './logger';

import { isArrayLike } from './lib/isArrayLike';
import { toIterable } from './lib/toIterable';

import { ForEachFn } from './types/fn/forEach';
import { FoldFn } from './types/fn/fold';
import { MapFn } from './types/fn/map';
import { PredicateFn } from './types/fn/predicate';

import { _all } from './iterator/all';
import { _any } from './iterator/any';
import { _chain } from './iterator/chain';
import { _collect } from './iterator/collect';
import { _count } from './iterator/count';
import { _drop } from './iterator/drop';
import { _dropWhile } from './iterator/dropWhile';
import { _enumerate } from './iterator/enumerate';
import { _filter } from './iterator/filter';
import { _find } from './iterator/find';
import { _foldl } from './iterator/foldl';
import { _foldl1 } from './iterator/foldl1';
import { _forEach } from './iterator/forEach';
import { _map } from './iterator/map';
import { _product } from './iterator/product';
import { _reverse } from './iterator/reverse';
import { _sum } from './iterator/sum';
import { _take } from './iterator/take';
import { _takeWhile } from './iterator/takeWhile';

const logger = getLogger('iterator');

export type ToAsyncIterator<Type> = Type extends number
    ? AsyncIterator_<Type>
    : Omit<AsyncIterator_<Type>, 'sum' | 'product'>;

export class AsyncIterator_<T> implements AsyncIterableIterator<T> {
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

    public all(fn: PredicateFn<T>) {
        logger.trace('all()');
        return _all(fn, this);
    }

    public any(fn: PredicateFn<T>) {
        logger.trace('any()');
        return _any(fn, this);
    }

    public chain(other: Iterable<T> | AsyncIterable<T>) {
        logger.trace('chain()');
        return _chain<T>(this, other);
    }

    public collect() {
        logger.trace('collect()');
        return _collect(this);
    }

    public count() {
        logger.trace('count()');
        return _count(this);
    }

    public drop(count: number) {
        logger.trace('drop()');
        return _drop(count, this);
    }

    public dropWhile(predicate: PredicateFn<T>) {
        logger.trace('dropWhile()');
        return _dropWhile(predicate, this);
    }

    public enumerate() {
        logger.trace('enumerate()');
        return _enumerate(this);
    }

    public filter(predicate: PredicateFn<T>) {
        logger.trace('filter()');
        return _filter(predicate, this);
    }

    public find(predicate: PredicateFn<T>) {
        logger.trace('find()');
        return _find(predicate, this);
    }

    public foldl<B>(init: B | Promise<B>, fn: FoldFn<T, B>) {
        logger.trace('fold()');
        return _foldl(fn, init, this);
    }

    public foldl1(fn: FoldFn<T, T>) {
        logger.trace('fold1()');
        return _foldl1(fn, this);
    }

    public forEach(fn: ForEachFn<T>) {
        logger.trace('forEach()');
        return _forEach(fn, this);
    }

    public map<R>(fn: MapFn<T, R>) {
        logger.trace('map()');
        return _map(fn, this);
    }

    public product() {
        logger.trace('product()');
        return _product(this as any);
    }

    public reverse() {
        logger.trace('reverse()');
        return _reverse(this);
    }

    public sum() {
        logger.trace('sum()');
        return _sum(this as any);
    }

    public take(limit: number) {
        logger.trace('take()');
        return _take(limit, this);
    }

    public takeWhile(predicate: PredicateFn<T>) {
        logger.trace('takeWhile()');
        return _takeWhile(predicate, this);
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.trace('iterator()');
    return new AsyncIterator_<T>(iter) as ToAsyncIterator<T>;
}
