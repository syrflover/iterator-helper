import { getLogger } from './logger';

import { toAsyncIterable } from './lib/iterable';
import { next_async } from './lib/iterable/next';
import { cmp } from './lib/cmp';

import { ForEachFn } from './types/fn/forEach';
import { FoldlFn, FoldrFn } from './types/fn/fold';
import { MapFn } from './types/fn/map';
import { PredicateFn } from './types/fn/predicate';
import { CompareFn } from './types/fn/cmp';
import { ByKeyFn } from './types/fn/byKey';
import { ScanlFn, ScanrFn } from './types/fn/scan';
import { EqualFn } from './types/fn/equal';

import { Flatten } from './types/flatten';
import { Pair, pair } from './types/pair';
import { Nullable } from './types/nullable';

import { _all } from './methods/all';
import { _any } from './methods/any';
import { _average } from './methods/average';
import { _chain } from './methods/chain';
import { _collect } from './methods/collect';
import { _count } from './methods/count';
import { _cycle } from './methods/cycle';
import { _enumerate } from './methods/enumerate';
import { _filter } from './methods/filter';
import { _filterMap } from './methods/filterMap';
import { _find } from './methods/find';
import { _findMap } from './methods/findMap';
import { _flatMap } from './methods/flatMap';
import { _flatten } from './methods/flatten';
import { _foldl } from './methods/foldl';
import { _foldl1 } from './methods/foldl1';
import { _forEach } from './methods/forEach';
import { _head } from './methods/head';
import { _inspect } from './methods/inspect';
import { _last } from './methods/last';
import { _map } from './methods/map';
import { _max } from './methods/max';
import { _maxBy } from './methods/maxBy';
import { _maxByKey } from './methods/maxByKey';
import { _min } from './methods/min';
import { _minBy } from './methods/minBy';
import { _minByKey } from './methods/minByKey';
import { _nth } from './methods/nth';
import { _nub } from './methods/nub';
import { _nubBy } from './methods/nubBy';
import { _partition } from './methods/partition';
import { _position } from './methods/position';
import { _product } from './methods/product';
import { _reverse } from './methods/reverse';
import { _scanl } from './methods/scanl';
import { _scanl1 } from './methods/scanl1';
import { _scanr } from './methods/scanr';
import { _scanr1 } from './methods/scanr1';
import { _skip } from './methods/skip';
import { _skipWhile } from './methods/skipWhile';
import { _stepBy } from './methods/stepBy';
import { _sum } from './methods/sum';
import { _take } from './methods/take';
import { _takeWhile } from './methods/takeWhile';
import { _foldr } from './methods/foldr';
import { _foldr1 } from './methods/foldr1';
import { _unzip } from './methods/unzip';
import { _zip } from './methods/zip';

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
        logger.trace('constructor()');
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
        logger.trace('[Symbol.asyncIterator]()');
        return this;
    }

    public async next() {
        logger.trace('next()');
        const { done, value } = await next_async(this._iter);

        return {
            done,
            value,
        };
    }

    public all(fn: PredicateFn<T>) {
        logger.trace('all()');
        return _all<T>(fn, this);
    }

    public any(fn: PredicateFn<T>) {
        logger.trace('any()');
        return _any<T>(fn, this);
    }

    public average() {
        logger.trace('average()');
        return _average(this as any);
    }

    public chain(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
        logger.trace('chain()');
        return (new AsyncIterator_<T>(_chain<T>(other, this)) as unknown) as ToAsyncIterator<T>;
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
        return (new AsyncIterator_<T>(_cycle<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public enumerate() {
        logger.trace('enumerate()');
        return (new AsyncIterator_<Pair<number, T>>(_enumerate<T>(this)) as unknown) as ToAsyncIterator<Pair<number, T>>;
    }

    public filter(predicate: PredicateFn<T>) {
        logger.trace('filter()');
        return (new AsyncIterator_<T>(_filter<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public filterMap<R>(fn: MapFn<T, Nullable<R>>) {
        logger.trace('filterMap()');
        return (new AsyncIterator_<R>(_filterMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
    }

    public find(predicate: PredicateFn<T>) {
        logger.trace('find()');
        return _find<T>(predicate, this);
    }

    public findMap<R>(fn: MapFn<T, Nullable<R>>) {
        logger.trace('findMap()');
        return _findMap<T, R>(fn, this);
    }

    public flatMap<R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>) {
        logger.trace('flatMap()');
        return (new AsyncIterator_<Flatten<R>>(_flatMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<Flatten<R>>;
    }

    public flatten() {
        logger.trace('flatten()');
        return (new AsyncIterator_<Flatten<T>>(_flatten<T>(this)) as unknown) as ToAsyncIterator<Flatten<T>>;
    }

    public foldl<U>(init: U | Promise<U>, fn: FoldlFn<T, U>) {
        logger.trace('fold()');
        return _foldl<T, U>(fn, init, this);
    }

    public foldl1(fn: FoldlFn<T, T>) {
        logger.trace('fold1()');
        return _foldl1<T>(fn, this);
    }

    public foldr<U>(init: U | Promise<U>, fn: FoldrFn<T, U>) {
        logger.trace('foldr()');
        return _foldr(fn, init, this);
    }

    public foldr1(fn: FoldrFn<T, T>) {
        logger.trace('foldr()');
        return _foldr1(fn, this);
    }

    public forEach(fn: ForEachFn<T>) {
        logger.trace('forEach()');
        return _forEach<T>(fn, this);
    }

    public head() {
        logger.trace('head()');
        return _head<T>(this);
    }

    public inspect(fn: ForEachFn<T>) {
        logger.trace('inspect()');
        return (new AsyncIterator_<T>(_inspect<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public last() {
        logger.trace('last()');
        return _last<T>(this);
    }

    public map<R>(fn: MapFn<T, R>) {
        logger.trace('map()');
        return (new AsyncIterator_<R>(_map<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
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
        return _maxByKey<T>(keyFn, cmpFn || cmp, this);
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
        return _minByKey<T>(keyFn, cmpFn || cmp, this);
    }

    public nth(n: number) {
        logger.trace('nth()');
        return _nth<T>(n, this);
    }

    public nub() {
        logger.trace('nub()');
        return (new AsyncIterator_<T>(_nub<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public nubBy(fn: EqualFn<T>) {
        logger.trace('nubBy()');
        return (new AsyncIterator_<T>(_nubBy<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async partition(fn: PredicateFn<T>) {
        logger.trace('partition()');
        const [left, right] = await _partition(fn, this);
        return (pair(new AsyncIterator_<T>(left), new AsyncIterator_<T>(right)) as unknown) as Pair<ToAsyncIterator<T>, ToAsyncIterator<T>>;
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
        return (new AsyncIterator_<T>(_reverse<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public scanl<U>(init: U | Promise<U>, fn: ScanlFn<T, U>) {
        logger.trace('scanl()');
        return (new AsyncIterator_<U>(_scanl<T, U>(fn, init, this)) as unknown) as ToAsyncIterator<U>;
    }

    public scanl1(fn: ScanlFn<T, T>) {
        logger.trace('scanl1()');
        return (new AsyncIterator_<T>(_scanl1<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public scanr<U>(init: U | Promise<U>, fn: ScanrFn<T, U>) {
        logger.trace('scanr()');
        return (new AsyncIterator_<U>(_scanr<T, U>(fn, init, this)) as unknown) as ToAsyncIterator<U>;
    }

    public scanr1(fn: ScanrFn<T, T>) {
        logger.trace('scanr1()');
        return (new AsyncIterator_<T>(_scanr1<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skip(count: number) {
        logger.trace('drop()');
        return (new AsyncIterator_<T>(_skip<T>(count, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skipWhile(predicate: PredicateFn<T>) {
        logger.trace('dropWhile()');
        return (new AsyncIterator_<T>(_skipWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public stepBy(step: number) {
        logger.trace('stepBy()');
        return (new AsyncIterator_<T>(_stepBy<T>(step, this)) as unknown) as ToAsyncIterator<T>;
    }

    public sum() {
        logger.trace('sum()');
        return _sum(this as any);
    }

    public take(limit: number) {
        logger.trace('take()');
        return (new AsyncIterator_<T>(_take<T>(limit, this)) as unknown) as ToAsyncIterator<T>;
    }

    public takeWhile(predicate: PredicateFn<T>) {
        logger.trace('takeWhile()');
        return (new AsyncIterator_<T>(_takeWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async unzip() {
        logger.trace('unzip()');
        const [left, right] = await _unzip<any, any>(this as any);
        return (pair(new AsyncIterator_<any>(left), new AsyncIterator_<any>(right)) as unknown) as Pair<ToAsyncIterator<any>, ToAsyncIterator<any>>;
    }

    public zip<U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>) {
        logger.trace('zip()');
        return (new AsyncIterator_<Pair<T, U>>(_zip<T, U>(other, this)) as unknown) as ToAsyncIterator<Pair<T, U>>;
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.trace('iterator()');
    const it = toAsyncIterable(iter);
    return (new AsyncIterator_<T>(it) as unknown) as ToAsyncIterator<T>;
}
