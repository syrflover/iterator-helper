import { getLogger } from './logger';

import { toIterable } from './lib/iterable';

import { isArrayLike } from './types/guard/isArrayLike';

import { ForEachFn } from './types/fn/forEach';
import { FoldFn } from './types/fn/fold';
import { MapFn } from './types/fn/map';
import { PredicateFn } from './types/fn/predicate';
import { CompareFn } from './types/fn/cmp';
import { ByKeyFn } from './types/fn/byKey';

import { Flatten } from './types/flatten';
import { Pair } from './types/pair';

import { _all } from './iterator/all';
import { _any } from './iterator/any';
import { _chain } from './iterator/chain';
import { _collect } from './iterator/collect';
import { _count } from './iterator/count';
import { _cycle } from './iterator/cycle';
import { _enumerate } from './iterator/enumerate';
import { _filter } from './iterator/filter';
import { _find } from './iterator/find';
import { _flatten } from './iterator/flatten';
import { _foldl } from './iterator/foldl';
import { _foldl1 } from './iterator/foldl1';
import { _forEach } from './iterator/forEach';
import { _inspect } from './iterator/inspect';
import { _map } from './iterator/map';
import { _max } from './iterator/max';
import { _maxBy } from './iterator/maxBy';
import { _maxByKey } from './iterator/maxByKey';
import { _min } from './iterator/min';
import { _minBy } from './iterator/minBy';
import { _minByKey } from './iterator/minByKey';
import { _nth } from './iterator/nth';
import { _partition } from './iterator/partition';
import { _position } from './iterator/position';
import { _product } from './iterator/product';
import { _reverse } from './iterator/reverse';
import { _skip } from './iterator/skip';
import { _skipWhile } from './iterator/skipWhile';
import { _sum } from './iterator/sum';
import { _take } from './iterator/take';
import { _takeWhile } from './iterator/takeWhile';

const logger = getLogger('iterator');

// prettier-ignore
export type ToAsyncIterator<T> =
    T extends number ? IAsyncIterator_number : IAsyncIterator_<T>;

export interface IAsyncIterator_<T> extends AsyncIterableIterator<T> {
    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.all
     */
    all(fn: PredicateFn<T>): Promise<boolean>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.any
     */
    any(fn: PredicateFn<T>): Promise<boolean>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.chain
     */
    chain(other: Iterable<T> | AsyncIterable<T>): ToAsyncIterator<T>;

    /**
     * Convert AsyncIterator_ to Array
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.collect
     */
    collect(): Promise<T[]>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.count
     */
    count(): Promise<number>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.cycle
     */
    cycle(): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.enumerate
     */
    enumerate(): ToAsyncIterator<Pair<number, T>>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.filter
     */
    filter(predicate: PredicateFn<T>): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.find
     */
    find(predicate: PredicateFn<T>): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.flatten
     */
    flatten(): ToAsyncIterator<Flatten<T>>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:fold
     */
    foldl<U>(init: U | Promise<U>, fn: FoldFn<T, U>): Promise<U>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:foldl1
     */
    foldl1(fn: FoldFn<T, T>): Promise<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.for_each
     */
    forEach(fn: ForEachFn<T>): Promise<void>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.inspect
     */
    inspect(fn: ForEachFn<T>): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.map
     */
    map<R>(fn: MapFn<T, R>): ToAsyncIterator<R>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.max
     */
    max(): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.max_by
     */
    maxBy(fn: CompareFn<T>): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.max_by_key
     */
    maxByKey(keyFn: ByKeyFn<T>, cmpFn?: CompareFn<T>): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.min
     */
    min(): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.min_by
     */
    minBy(fn: CompareFn<T>): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.min_by_key
     */
    minByKey(keyFn: ByKeyFn<T>, cmpFn?: CompareFn<T>): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.nth
     */
    nth(index: number): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.partition
     */
    partition(fn: PredicateFn<T>): Promise<Pair<ToAsyncIterator<T>, ToAsyncIterator<T>>>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.position
     */
    position(fn: PredicateFn<T>): Promise<number | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.rev
     */
    reverse(): ToAsyncIterator<T>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:drop
     */
    skip(count: number): ToAsyncIterator<T>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:dropWhile
     */
    skipWhile(predicate: PredicateFn<T>): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.take
     */
    take(limit: number): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.take_while
     */
    takeWhile(predicate: PredicateFn<T>): ToAsyncIterator<T>;
}

export interface IAsyncIterator_number extends IAsyncIterator_<number> {
    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.product
     */
    product(): Promise<number>;
    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.sum
     */
    sum(): Promise<number>;
}

export class AsyncIterator_<T> implements IAsyncIterator_<T> {
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
        return _all<T>(fn, this);
    }

    public any(fn: PredicateFn<T>) {
        logger.trace('any()');
        return _any<T>(fn, this);
    }

    public chain(other: Iterable<T> | AsyncIterable<T>) {
        logger.trace('chain()');
        return _chain<T>(other, this);
    }

    public collect() {
        logger.trace('collect()');
        return _collect<T>(this);
    }

    public count() {
        logger.trace('count()');
        return _count<T>(this);
    }

    public cycle() {
        logger.trace('cycle()');
        return _cycle<T>(this);
    }

    public enumerate() {
        logger.trace('enumerate()');
        return _enumerate<T>(this);
    }

    public filter(predicate: PredicateFn<T>) {
        logger.trace('filter()');
        return _filter<T>(predicate, this);
    }

    public find(predicate: PredicateFn<T>) {
        logger.trace('find()');
        return _find<T>(predicate, this);
    }

    public flatten() {
        logger.trace('flatten()');
        return _flatten<T>(this);
    }

    public foldl<U>(init: U | Promise<U>, fn: FoldFn<T, U>) {
        logger.trace('fold()');
        return _foldl<T, U>(fn, init, this);
    }

    public foldl1(fn: FoldFn<T, T>) {
        logger.trace('fold1()');
        return _foldl1<T>(fn, this);
    }

    public forEach(fn: ForEachFn<T>) {
        logger.trace('forEach()');
        return _forEach<T>(fn, this);
    }

    public inspect(fn: ForEachFn<T>) {
        logger.trace('inspect()');
        return _inspect<T>(fn, this);
    }

    public map<R>(fn: MapFn<T, R>) {
        logger.trace('map()');
        return _map<T, R>(fn, this);
    }

    public max() {
        logger.trace('max()');
        return _max<T>(this);
    }

    public maxBy(fn: CompareFn<T>) {
        logger.trace('maxBy()');
        return _maxBy<T>(fn, this);
    }

    public maxByKey(keyFn: ByKeyFn<T>, cmpFn?: CompareFn<T>) {
        logger.trace('maxByKey()');
        return _maxByKey<T>(cmpFn, keyFn, this);
    }

    public min() {
        logger.trace('min()');
        return _min<T>(this);
    }

    public minBy(fn: CompareFn<T>) {
        logger.trace('minBy()');
        return _minBy<T>(fn, this);
    }

    public minByKey(keyFn: ByKeyFn<T>, cmpFn?: CompareFn<T>) {
        logger.trace('minByKey()');
        return _minByKey<T>(cmpFn, keyFn, this);
    }

    public nth(index: number) {
        logger.trace('nth()');
        return _nth<T>(index, this);
    }

    public partition(fn: PredicateFn<T>) {
        logger.trace('partition()');
        return _partition(fn, this);
    }

    public position(fn: PredicateFn<T>) {
        logger.trace('position()');
        return _position<T>(fn, this);
    }

    public product() {
        logger.trace('product()');
        return _product(this as any);
    }

    public reverse() {
        logger.trace('reverse()');
        return _reverse<T>(this);
    }

    public skip(count: number) {
        logger.trace('drop()');
        return _skip<T>(count, this);
    }

    public skipWhile(predicate: PredicateFn<T>) {
        logger.trace('dropWhile()');
        return _skipWhile<T>(predicate, this);
    }

    public sum() {
        logger.trace('sum()');
        return _sum(this as any);
    }

    public take(limit: number) {
        logger.trace('take()');
        return _take<T>(limit, this);
    }

    public takeWhile(predicate: PredicateFn<T>) {
        logger.trace('takeWhile()');
        return _takeWhile<T>(predicate, this);
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.trace('iterator()');
    return (new AsyncIterator_(iter) as unknown) as ToAsyncIterator<T>;
}
