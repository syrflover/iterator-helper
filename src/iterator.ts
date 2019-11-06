import { getLogger } from './logger.ts';

import { sequence } from './lib/iterable.ts';
import { next_async } from './lib/iterable/next.ts';
import { cmp } from './lib/cmp.ts';

import { ForEachFn } from './types/fn/forEach.ts';
import { FoldlFn, FoldrFn } from './types/fn/fold.ts';
import { MapFn } from './types/fn/map.ts';
import { PredicateFn } from './types/fn/predicate.ts';
import { CompareFn } from './types/fn/cmp.ts';
import { KeyFn } from './types/fn/key.ts';
import { ScanlFn, ScanrFn } from './types/fn/scan.ts';
import { EqualFn } from './types/fn/equal.ts';

import { Flatten } from './types/flatten.ts';
import { Pair, pair } from './types/pair.ts';
import { Nullable } from './types/nullable.ts';

import { _all } from './methods/all.ts';
import { _any } from './methods/any.ts';
import { _average } from './methods/average.ts';
import { _chain } from './methods/chain.ts';
import { _collect } from './methods/collect.ts';
import { _count } from './methods/count.ts';
import { _cycle } from './methods/cycle.ts';
import { _enumerate } from './methods/enumerate.ts';
import { _filter } from './methods/filter.ts';
import { _filterMap } from './methods/filterMap.ts';
import { _find } from './methods/find.ts';
import { _findMap } from './methods/findMap.ts';
import { _flatMap } from './methods/flatMap.ts';
import { _flatten } from './methods/flatten.ts';
import { _foldl } from './methods/foldl.ts';
import { _foldl1 } from './methods/foldl1.ts';
import { _foldr } from './methods/foldr.ts';
import { _foldr1 } from './methods/foldr1.ts';
import { _forEach } from './methods/forEach.ts';
import { _head } from './methods/head.ts';
import { _inspect } from './methods/inspect.ts';
import { _last } from './methods/last.ts';
import { _map } from './methods/map.ts';
import { _max } from './methods/max.ts';
import { _maxBy } from './methods/maxBy.ts';
import { _maxByKey } from './methods/maxByKey.ts';
import { _min } from './methods/min.ts';
import { _minBy } from './methods/minBy.ts';
import { _minByKey } from './methods/minByKey.ts';
import { _nth } from './methods/nth.ts';
import { _nub } from './methods/nub.ts';
import { _nubBy } from './methods/nubBy.ts';
import { _partition } from './methods/partition.ts';
import { _position } from './methods/position.ts';
import { _product } from './methods/product.ts';
import { _reverse } from './methods/reverse.ts';
import { _scanl } from './methods/scanl.ts';
import { _scanl1 } from './methods/scanl1.ts';
import { _scanr } from './methods/scanr.ts';
import { _scanr1 } from './methods/scanr1.ts';
import { _skip } from './methods/skip.ts';
import { _skipWhile } from './methods/skipWhile.ts';
import { _stepBy } from './methods/stepBy.ts';
import { _sum } from './methods/sum.ts';
import { _take } from './methods/take.ts';
import { _takeWhile } from './methods/takeWhile.ts';
import { _unzip } from './methods/unzip.ts';
import { _zip } from './methods/zip.ts';

const logger = getLogger('iterator');

// prettier-ignore
export type ToAsyncIterator<T> =
    T extends number ? IAsyncIterator_number :
    T extends Pair<infer A, infer B> ? IAsyncIterator_zip<A, B> :
    IAsyncIterator_<T>;

export interface IAsyncIterator_<T> extends AsyncIterableIterator<T> {
    /**
     * @see https://tc39.es/proposal-iterator-helpers/#sec-asynciteratorprototype-@@tostringtag
     */
    [Symbol.toStringTag]: 'Async Iterator';

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
    chain(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>): ToAsyncIterator<T>;

    /**
     * @description
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
     * @description
     * do not catch error
     *
     * filter only `null | undefined | NaN`
     *
     * @example
     * ['a', 'b', '1', 'c', '2', '3']
     *   .iter()
     *   .filterMap(e => parseInt(e, 10))
     *   .collect(); // [1, 2, 3]
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.filter_map
     */
    filterMap<R>(fn: MapFn<T, Nullable<R>>): ToAsyncIterator<R>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.find
     */
    find(predicate: PredicateFn<T>): Promise<T | undefined>;

    /**
     * @description
     * do not catch error
     *
     * filter only `null | undefined | NaN`
     *
     * @example
     * ['a', 'b', '1', 'c', '2']
     *   .iter()
     *   .findMap(e => parseInt(e, 10)); // 1
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.find_map
     */
    findMap<R>(fn: MapFn<T, Nullable<R>>): Promise<R | undefined>;

    /**
     * @example
     * [`it's Sunny in`, '', 'California']
     *   .iter()
     *   .flatMap(e => e.split(' '))
     *   .collect(); // [`it's`, 'Sunny', 'in', '', 'California']
     *
     * @see https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.flat_map
     */
    flatMap<R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>): ToAsyncIterator<Flatten<R>>;

    /**
     * @example
     * [[1], [Promise.resolve(2), 3], 4, 5]
     *   .iter()
     *   .flatten()
     *   .collect(); // [1, 2, 3, 4, 5]
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.flatten
     */
    flatten(): ToAsyncIterator<Flatten<T>>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:foldl
     */
    foldl<U>(init: U | Promise<U>, fn: FoldlFn<T, U>): Promise<U>;

    /**
     * @throws empty iterator
     *
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:foldl1
     */
    foldl1(fn: FoldlFn<T, T>): Promise<T>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:foldr
     */
    foldr<U>(init: U | Promise<U>, fn: FoldrFn<T, U>): Promise<U>;

    /**
     * @throws empty iterator
     *
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:foldr1
     */
    foldr1(fn: FoldrFn<T, T>): Promise<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.for_each
     */
    forEach(fn: ForEachFn<T>): Promise<void>;

    /**
     * @description
     * if empty iterator, return undefined
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#tymethod.next
     */
    head(): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.inspect
     */
    inspect(fn: ForEachFn<T>): ToAsyncIterator<T>;

    /**
     * @description
     * if empty iterator, return undefined
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.last
     */
    last(): Promise<T | undefined>;

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
    maxByKey<K>(keyFn: KeyFn<T, K>, cmpFn?: CompareFn<K>): Promise<T | undefined>;

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
    minByKey<K>(keyFn: KeyFn<T, K>, cmpFn?: CompareFn<K>): Promise<T | undefined>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.nth
     */
    nth(n: number): Promise<T | undefined>;

    /**
     * @see https://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:nub
     */
    nub(): ToAsyncIterator<T>;

    /**
     * @see https://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:nubBy
     */
    nubBy(fn: EqualFn<T>): ToAsyncIterator<T>;

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
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:scanl
     */
    scanl<U>(init: U | Promise<U>, fn: ScanlFn<T, U>): ToAsyncIterator<U>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:scanl1
     */
    scanl1(fn: ScanlFn<T, T>): ToAsyncIterator<T>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:scanr
     */
    scanr<U>(init: U | Promise<U>, fn: ScanrFn<T, U>): ToAsyncIterator<U>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:scanr1
     */
    scanr1(fn: ScanrFn<T, T>): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.skip
     */
    skip(count: number): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.skip_while
     */
    skipWhile(predicate: PredicateFn<T>): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.step_by
     */
    stepBy(step: number): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.take
     */
    take(limit: number): ToAsyncIterator<T>;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.take_while
     */
    takeWhile(predicate: PredicateFn<T>): ToAsyncIterator<T>;

    toString(): string;

    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.zip
     */
    zip<U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>): ToAsyncIterator<Pair<T, U>>;
}

export interface IAsyncIterator_number extends IAsyncIterator_<number> {
    /**
     * @example
     * [1, 2, 3, 4, 5]
     *   .iter()
     *   .average(); // 3
     *
     * ([] as number[])
     *   .iter()
     *   .average(); // 0
     */
    average(): Promise<number>;

    /**
     * @example
     * [1, 2, 3, 4, 5]
     *   .iter()
     *   .product(); // 120
     *
     * ([] as number[])
     *   .iter()
     *   .product(); // 1
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.product
     */
    product(): Promise<number>;

    /**
     * @example
     * [1, 2, 3, 4, 5]
     *   .iter()
     *   .sum(); // 15
     *
     * ([] as number[])
     *   .iter()
     *   .sum(); // 0
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.sum
     */
    sum(): Promise<number>;
}

export interface IAsyncIterator_zip<T, U> extends IAsyncIterator_<Pair<T, U>> {
    /**
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.unzip
     */
    unzip(): Promise<Pair<ToAsyncIterator<T>, ToAsyncIterator<U>>>;
}

export class AsyncIterator_<T> implements IAsyncIterator_<T> {
    constructor(iter: AsyncIterable<T | Promise<T>>) {
        logger.info('constructor()');
        this._iter = {
            async *[Symbol.asyncIterator]() {
                yield* iter;
            },
        };

        Object.defineProperty(this, '_iter', {
            configurable: false,
            enumerable: false,
            writable: false,
        });

        Object.defineProperty(this, Symbol.toStringTag, {
            configurable: true,
            enumerable: false,
            writable: false,
        });
    }

    private readonly _iter: AsyncIterable<T>;

    public readonly [Symbol.toStringTag] = 'Async Iterator' as const;

    public [Symbol.asyncIterator]() {
        logger.info('[Symbol.asyncIterator]()');
        return this;
    }

    public async next() {
        logger.info('next()');
        const { done, value } = await next_async(this._iter);

        return {
            done,
            value,
        };
    }

    public all(fn: PredicateFn<T>) {
        logger.info('all()');
        return _all<T>(fn, this);
    }

    public any(fn: PredicateFn<T>) {
        logger.info('any()');
        return _any<T>(fn, this);
    }

    public average() {
        logger.info('average()');
        return _average(this as any);
    }

    public chain(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
        logger.info('chain()');
        return (new AsyncIterator_<T>(_chain<T>(other, this)) as unknown) as ToAsyncIterator<T>;
    }

    public collect() {
        logger.info('collect()');
        return _collect<T>(this);
    }

    public count() {
        logger.info('count()');
        return _count<T>(this);
    }

    public cycle() {
        logger.info('cycle()');
        return (new AsyncIterator_<T>(_cycle<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public enumerate() {
        logger.info('enumerate()');
        return (new AsyncIterator_<Pair<number, T>>(_enumerate<T>(this)) as unknown) as ToAsyncIterator<Pair<number, T>>;
    }

    public filter(predicate: PredicateFn<T>) {
        logger.info('filter()');
        return (new AsyncIterator_<T>(_filter<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public filterMap<R>(fn: MapFn<T, Nullable<R>>) {
        logger.info('filterMap()');
        return (new AsyncIterator_<R>(_filterMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
    }

    public find(predicate: PredicateFn<T>) {
        logger.info('find()');
        return _find<T>(predicate, this);
    }

    public findMap<R>(fn: MapFn<T, Nullable<R>>) {
        logger.info('findMap()');
        return _findMap<T, R>(fn, this);
    }

    public flatMap<R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>) {
        logger.info('flatMap()');
        return (new AsyncIterator_<Flatten<R>>(_flatMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<Flatten<R>>;
    }

    public flatten() {
        logger.info('flatten()');
        return (new AsyncIterator_<Flatten<T>>(_flatten<T>(this)) as unknown) as ToAsyncIterator<Flatten<T>>;
    }

    public foldl<U>(init: U | Promise<U>, fn: FoldlFn<T, U>) {
        logger.info('fold()');
        return _foldl<T, U>(fn, init, this);
    }

    public foldl1(fn: FoldlFn<T, T>) {
        logger.info('fold1()');
        return _foldl1<T>(fn, this);
    }

    public foldr<U>(init: U | Promise<U>, fn: FoldrFn<T, U>) {
        logger.info('foldr()');
        return _foldr(fn, init, this);
    }

    public foldr1(fn: FoldrFn<T, T>) {
        logger.info('foldr()');
        return _foldr1(fn, this);
    }

    public forEach(fn: ForEachFn<T>) {
        logger.info('forEach()');
        return _forEach<T>(fn, this);
    }

    public head() {
        logger.info('head()');
        return _head<T>(this);
    }

    public inspect(fn: ForEachFn<T>) {
        logger.info('inspect()');
        return (new AsyncIterator_<T>(_inspect<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public last() {
        logger.info('last()');
        return _last<T>(this);
    }

    public map<R>(fn: MapFn<T, R>) {
        logger.info('map()');
        return (new AsyncIterator_<R>(_map<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
    }

    public max() {
        logger.info('max()');
        return _max<T>(this);
    }

    public maxBy(fn: CompareFn<T>) {
        logger.info('maxBy()');
        return _maxBy<T>(fn, this);
    }

    public maxByKey<K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K> = cmp) {
        logger.info('maxByKey()');
        return _maxByKey<T, K>(keyFn, cmpFn, this);
    }

    public min() {
        logger.info('min()');
        return _min<T>(this);
    }

    public minBy(fn: CompareFn<T>) {
        logger.info('minBy()');
        return _minBy<T>(fn, this);
    }

    public minByKey<K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K> = cmp) {
        logger.info('minByKey()');
        return _minByKey<T, K>(keyFn, cmpFn, this);
    }

    public nth(n: number) {
        logger.info('nth()');
        return _nth<T>(n, this);
    }

    public nub() {
        logger.info('nub()');
        return (new AsyncIterator_<T>(_nub<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public nubBy(fn: EqualFn<T>) {
        logger.info('nubBy()');
        return (new AsyncIterator_<T>(_nubBy<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async partition(fn: PredicateFn<T>) {
        logger.info('partition()');
        const [left, right] = await _partition(fn, this);
        return (pair(new AsyncIterator_<T>(left), new AsyncIterator_<T>(right)) as unknown) as Pair<ToAsyncIterator<T>, ToAsyncIterator<T>>;
    }

    public position(fn: PredicateFn<T>) {
        logger.info('position()');
        return _position<T>(fn, this);
    }

    public product() {
        logger.info('product()');
        return _product(this as any);
    }

    public reverse() {
        logger.info('reverse()');
        return (new AsyncIterator_<T>(_reverse<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public scanl<U>(init: U | Promise<U>, fn: ScanlFn<T, U>) {
        logger.info('scanl()');
        return (new AsyncIterator_<U>(_scanl<T, U>(fn, init, this)) as unknown) as ToAsyncIterator<U>;
    }

    public scanl1(fn: ScanlFn<T, T>) {
        logger.info('scanl1()');
        return (new AsyncIterator_<T>(_scanl1<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public scanr<U>(init: U | Promise<U>, fn: ScanrFn<T, U>) {
        logger.info('scanr()');
        return (new AsyncIterator_<U>(_scanr<T, U>(fn, init, this)) as unknown) as ToAsyncIterator<U>;
    }

    public scanr1(fn: ScanrFn<T, T>) {
        logger.info('scanr1()');
        return (new AsyncIterator_<T>(_scanr1<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skip(count: number) {
        logger.info('drop()');
        return (new AsyncIterator_<T>(_skip<T>(count, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skipWhile(predicate: PredicateFn<T>) {
        logger.info('dropWhile()');
        return (new AsyncIterator_<T>(_skipWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public stepBy(step: number) {
        logger.info('stepBy()');
        return (new AsyncIterator_<T>(_stepBy<T>(step, this)) as unknown) as ToAsyncIterator<T>;
    }

    public sum() {
        logger.info('sum()');
        return _sum(this as any);
    }

    public take(limit: number) {
        logger.info('take()');
        return (new AsyncIterator_<T>(_take<T>(limit, this)) as unknown) as ToAsyncIterator<T>;
    }

    public takeWhile(predicate: PredicateFn<T>) {
        logger.info('takeWhile()');
        return (new AsyncIterator_<T>(_takeWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async unzip() {
        logger.info('unzip()');
        const [left, right] = await _unzip<any, any>(this as any);
        return (pair(new AsyncIterator_<any>(left), new AsyncIterator_<any>(right)) as unknown) as Pair<ToAsyncIterator<any>, ToAsyncIterator<any>>;
    }

    public zip<U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>) {
        logger.info('zip()');
        return (new AsyncIterator_<Pair<T, U>>(_zip<T, U>(other, this)) as unknown) as ToAsyncIterator<Pair<T, U>>;
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.info('iterator()');
    const it = sequence(iter);
    return (new AsyncIterator_<T>(it) as unknown) as ToAsyncIterator<T>;
}
