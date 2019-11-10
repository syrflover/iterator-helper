import { getLogger } from './logger.ts';

import { compare } from './lib/compare/mod.ts';
import { next_async, sequence } from './lib/iterable/mod.ts';

import {
    Flatten,
    Pair,
    pair,
    Nullable,
} from './types/mod.ts';

import {
    ForEachFn,
    FoldlFn,
    MapFn,
    PredicateFn,
    CompareFn,
    KeyFn,
    ScanlFn,
    EqualFn,
} from './types/fn/mod.ts';

import {
    all,
    any,
    average,
    chain,
    collect,
    count,
    cycle,
    enumerate,
    filter,
    filterMap,
    find,
    findMap,
    flatMap,
    flatten,
    foldl,
    foldl1,
    forEach,
    head,
    inspect,
    last,
    map,
    max,
    maxBy,
    maxByKey,
    min,
    minBy,
    minByKey,
    nth,
    nub,
    nubBy,
    partition,
    position,
    product,
    reverse,
    scanl,
    scanl1,
    skip,
    skipWhile,
    stepBy,
    sum,
    take,
    takeWhile,
    unzip,
    zip,
} from './methods/mod.ts';

const logger = getLogger('methods');

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
        return all<T>(fn, this);
    }

    public any(fn: PredicateFn<T>) {
        logger.trace('any()');
        return any<T>(fn, this);
    }

    public average() {
        logger.trace('average()');
        return average(this as any);
    }

    public chain(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
        logger.trace('chain()');
        return (new AsyncIterator_<T>(chain<T>(other, this)) as unknown) as ToAsyncIterator<T>;
    }

    public collect() {
        logger.trace('collect()');
        return collect<T>(this);
    }

    public count() {
        logger.trace('count()');
        return count<T>(this);
    }

    public cycle() {
        logger.trace('cycle()');
        return (new AsyncIterator_<T>(cycle<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public enumerate() {
        logger.trace('enumerate()');
        return (new AsyncIterator_<Pair<number, T>>(enumerate<T>(this)) as unknown) as ToAsyncIterator<Pair<number, T>>;
    }

    public filter(predicate: PredicateFn<T>) {
        logger.trace('filter()');
        return (new AsyncIterator_<T>(filter<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public filterMap<R>(fn: MapFn<T, Nullable<R>>) {
        logger.trace('filterMap()');
        return (new AsyncIterator_<R>(filterMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
    }

    public find(predicate: PredicateFn<T>) {
        logger.trace('find()');
        return find<T>(predicate, this);
    }

    public findMap<R>(fn: MapFn<T, Nullable<R>>) {
        logger.trace('findMap()');
        return findMap<T, R>(fn, this);
    }

    public flatMap<R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>) {
        logger.trace('flatMap()');
        return (new AsyncIterator_<Flatten<R>>(flatMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<Flatten<R>>;
    }

    public flatten() {
        logger.trace('flatten()');
        return (new AsyncIterator_<Flatten<T>>(flatten<T>(this)) as unknown) as ToAsyncIterator<Flatten<T>>;
    }

    public foldl<U>(init: U | Promise<U>, fn: FoldlFn<T, U>) {
        logger.trace('fold()');
        return foldl<T, U>(fn, init, this);
    }

    public foldl1(fn: FoldlFn<T, T>) {
        logger.trace('fold1()');
        return foldl1<T>(fn, this);
    }

    public forEach(fn: ForEachFn<T>) {
        logger.trace('forEach()');
        return forEach<T>(fn, this);
    }

    public head() {
        logger.trace('head()');
        return head<T>(this);
    }

    public inspect(fn: ForEachFn<T>) {
        logger.trace('inspect()');
        return (new AsyncIterator_<T>(inspect<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public last() {
        logger.trace('last()');
        return last<T>(this);
    }

    public map<R>(fn: MapFn<T, R>) {
        logger.trace('map()');
        return (new AsyncIterator_<R>(map<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
    }

    public max() {
        logger.trace('max()');
        return max<T>(this);
    }

    public maxBy(fn: CompareFn<T>) {
        logger.trace('maxBy()');
        return maxBy<T>(fn, this);
    }

    public maxByKey<K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K> = compare) {
        logger.trace('maxByKey()');
        return maxByKey<T, K>(keyFn, cmpFn, this);
    }

    public min() {
        logger.trace('min()');
        return min<T>(this);
    }

    public minBy(fn: CompareFn<T>) {
        logger.trace('minBy()');
        return minBy<T>(fn, this);
    }

    public minByKey<K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K> = compare) {
        logger.trace('minByKey()');
        return minByKey<T, K>(keyFn, cmpFn, this);
    }

    public nth(n: number) {
        logger.trace('nth()');
        return nth<T>(n, this);
    }

    public nub() {
        logger.trace('nub()');
        return (new AsyncIterator_<T>(nub<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public nubBy(fn: EqualFn<T>) {
        logger.trace('nubBy()');
        return (new AsyncIterator_<T>(nubBy<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async partition(fn: PredicateFn<T>) {
        logger.trace('partition()');
        const [left, right] = await partition(fn, this);
        return (pair(new AsyncIterator_<T>(left), new AsyncIterator_<T>(right)) as unknown) as Pair<ToAsyncIterator<T>, ToAsyncIterator<T>>;
    }

    public position(fn: PredicateFn<T>) {
        logger.trace('position()');
        return position<T>(fn, this);
    }

    public product() {
        logger.trace('product()');
        return product(this as any);
    }

    public reverse() {
        logger.trace('reverse()');
        return (new AsyncIterator_<T>(reverse<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public scanl<U>(init: U | Promise<U>, fn: ScanlFn<T, U>) {
        logger.trace('scanl()');
        return (new AsyncIterator_<U>(scanl<T, U>(fn, init, this)) as unknown) as ToAsyncIterator<U>;
    }

    public scanl1(fn: ScanlFn<T, T>) {
        logger.trace('scanl1()');
        return (new AsyncIterator_<T>(scanl1<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skip(count_: number) {
        logger.trace('drop()');
        return (new AsyncIterator_<T>(skip<T>(count_, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skipWhile(predicate: PredicateFn<T>) {
        logger.trace('dropWhile()');
        return (new AsyncIterator_<T>(skipWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public stepBy(step: number) {
        logger.trace('stepBy()');
        return (new AsyncIterator_<T>(stepBy<T>(step, this)) as unknown) as ToAsyncIterator<T>;
    }

    public sum() {
        logger.trace('sum()');
        return sum(this as any);
    }

    public take(limit: number) {
        logger.trace('take()');
        return (new AsyncIterator_<T>(take<T>(limit, this)) as unknown) as ToAsyncIterator<T>;
    }

    public takeWhile(predicate: PredicateFn<T>) {
        logger.trace('takeWhile()');
        return (new AsyncIterator_<T>(takeWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async unzip() {
        logger.trace('unzip()');
        const [left, right] = await unzip<any, any>(this as any);
        return (pair(new AsyncIterator_<any>(left), new AsyncIterator_<any>(right)) as unknown) as Pair<ToAsyncIterator<any>, ToAsyncIterator<any>>;
    }

    public zip<U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>) {
        logger.trace('zip()');
        return (new AsyncIterator_<Pair<T, U>>(zip<T, U>(other, this)) as unknown) as ToAsyncIterator<Pair<T, U>>;
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.trace('iterator()');
    const it = sequence(iter);
    return (new AsyncIterator_<T>(it) as unknown) as ToAsyncIterator<T>;
}
