import { getLogger } from './logger.ts';

import { compare } from './lib/compare/mod.ts';
import { next_async, sequence } from './lib/iterable/mod.ts';

import { Flatten, Pair, pair, Nullable } from './types/mod.ts';

import { ForEachFn, FoldFn, MapFn, PredicateFn, CompareFn, KeyFn, ScanFn, EqualFn } from './types/functions/mod.ts';

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
    fold,
    fold1,
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
    scan,
    scan1,
    skip,
    skipWhile,
    stepBy,
    sum,
    take,
    takeWhile,
    unzip,
    zip,
} from './methods/mod.ts';

const logger = await getLogger('iterator');

// prettier-ignore
export type ToAsyncIterator<T> =
    T extends number ? IAsyncIterator_number :
    T extends Pair<infer A, infer B> ? IAsyncIterator_zip<A, B> :
    IAsyncIterator_<T>;

export interface IAsyncIterator_<T> extends AsyncIterableIterator<T> {
    /**
     * @see https://tc39.es/proposal-iterator-helpers/#sec-asynciteratorprototype-@@tostringtag
     */
    [Symbol.toStringTag]: string;

    /**
     * similar Array.prototype.every
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.all
     */
    all(fn: PredicateFn<T>): Promise<boolean>;

    /**
     * similar Array.prototype.some
     *
     * @see https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.any
     */
    any(fn: PredicateFn<T>): Promise<boolean>;

    /**
     * similar concat
     *
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
    fold<U>(init: U | Promise<U>, fn: FoldFn<T, U>): Promise<U>;

    /**
     * @throws empty iterator
     *
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:foldl1
     */
    fold1(fn: FoldFn<T, T>): Promise<T>;

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
    scan<U>(init: U | Promise<U>, fn: ScanFn<T, U>): ToAsyncIterator<U>;

    /**
     * @see http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html#v:scanl1
     */
    scan1(fn: ScanFn<T, T>): ToAsyncIterator<T>;

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
    take(count: number): ToAsyncIterator<T>;

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
        return all<T>(fn, this);
    }

    public any(fn: PredicateFn<T>) {
        return any<T>(fn, this);
    }

    public average() {
        return average(this as any);
    }

    public chain(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
        return (new AsyncIterator_<T>(chain<T>(other, this)) as unknown) as ToAsyncIterator<T>;
    }

    public collect() {
        return collect<T>(this);
    }

    public count() {
        return count<T>(this);
    }

    public cycle() {
        return (new AsyncIterator_<T>(cycle<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public enumerate() {
        return (new AsyncIterator_<Pair<number, T>>(enumerate<T>(this)) as unknown) as ToAsyncIterator<Pair<number, T>>;
    }

    public filter(predicate: PredicateFn<T>) {
        return (new AsyncIterator_<T>(filter<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public filterMap<R>(fn: MapFn<T, Nullable<R>>) {
        return (new AsyncIterator_<R>(filterMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
    }

    public find(predicate: PredicateFn<T>) {
        return find<T>(predicate, this);
    }

    public findMap<R>(fn: MapFn<T, Nullable<R>>) {
        return findMap<T, R>(fn, this);
    }

    public flatMap<R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>) {
        return (new AsyncIterator_<Flatten<R>>(flatMap<T, R>(fn, this)) as unknown) as ToAsyncIterator<Flatten<R>>;
    }

    public flatten() {
        return (new AsyncIterator_<Flatten<T>>(flatten<T>(this)) as unknown) as ToAsyncIterator<Flatten<T>>;
    }

    public fold<U>(init: U | Promise<U>, fn: FoldFn<T, U>) {
        return fold<T, U>(fn, init, this);
    }

    public fold1(fn: FoldFn<T, T>) {
        return fold1<T>(fn, this);
    }

    public forEach(fn: ForEachFn<T>) {
        return forEach<T>(fn, this);
    }

    public head() {
        return head<T>(this);
    }

    public inspect(fn: ForEachFn<T>) {
        return (new AsyncIterator_<T>(inspect<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public last() {
        return last<T>(this);
    }

    public map<R>(fn: MapFn<T, R>) {
        return (new AsyncIterator_<R>(map<T, R>(fn, this)) as unknown) as ToAsyncIterator<R>;
    }

    public max() {
        return max<T>(this);
    }

    public maxBy(fn: CompareFn<T>) {
        return maxBy<T>(fn, this);
    }

    public maxByKey<K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K> = compare) {
        return maxByKey<T, K>(keyFn, cmpFn, this);
    }

    public min() {
        return min<T>(this);
    }

    public minBy(fn: CompareFn<T>) {
        return minBy<T>(fn, this);
    }

    public minByKey<K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K> = compare) {
        return minByKey<T, K>(keyFn, cmpFn, this);
    }

    public nth(n: number) {
        return nth<T>(n, this);
    }

    public nub() {
        return (new AsyncIterator_<T>(nub<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public nubBy(fn: EqualFn<T>) {
        return (new AsyncIterator_<T>(nubBy<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async partition(fn: PredicateFn<T>) {
        const [left, right] = await partition(fn, this);
        return (pair(new AsyncIterator_<T>(left), new AsyncIterator_<T>(right)) as unknown) as Pair<ToAsyncIterator<T>, ToAsyncIterator<T>>;
    }

    public position(fn: PredicateFn<T>) {
        return position<T>(fn, this);
    }

    public product() {
        return product(this as any);
    }

    public reverse() {
        return (new AsyncIterator_<T>(reverse<T>(this)) as unknown) as ToAsyncIterator<T>;
    }

    public scan<U>(init: U | Promise<U>, fn: ScanFn<T, U>) {
        return (new AsyncIterator_<U>(scan<T, U>(fn, init, this)) as unknown) as ToAsyncIterator<U>;
    }

    public scan1(fn: ScanFn<T, T>) {
        return (new AsyncIterator_<T>(scan1<T>(fn, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skip(count_: number) {
        return (new AsyncIterator_<T>(skip<T>(count_, this)) as unknown) as ToAsyncIterator<T>;
    }

    public skipWhile(predicate: PredicateFn<T>) {
        return (new AsyncIterator_<T>(skipWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public stepBy(step: number) {
        return (new AsyncIterator_<T>(stepBy<T>(step, this)) as unknown) as ToAsyncIterator<T>;
    }

    public sum() {
        return sum(this as any);
    }

    public take(count_: number) {
        return (new AsyncIterator_<T>(take<T>(count_, this)) as unknown) as ToAsyncIterator<T>;
    }

    public takeWhile(predicate: PredicateFn<T>) {
        return (new AsyncIterator_<T>(takeWhile<T>(predicate, this)) as unknown) as ToAsyncIterator<T>;
    }

    public async unzip() {
        const [left, right] = await unzip<any, any>(this as any);
        return (pair(new AsyncIterator_<any>(left), new AsyncIterator_<any>(right)) as unknown) as Pair<ToAsyncIterator<any>, ToAsyncIterator<any>>;
    }

    public zip<U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>) {
        return (new AsyncIterator_<Pair<T, U>>(zip<T, U>(other, this)) as unknown) as ToAsyncIterator<Pair<T, U>>;
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.trace('iterator()');
    const it = sequence(iter);
    return (new AsyncIterator_<T>(it) as unknown) as ToAsyncIterator<T>;
}
