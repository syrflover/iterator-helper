import './array/iter';

import { getLogger } from './logger';

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
import { _sum } from './iterator/sum';

const logger = getLogger('iterator');

export type IteratorHelper<Iter> = Iter extends Iterator<infer Type>
    ? Type extends number
        ? Iter
        : Omit<Iter, 'sum'>
    : unknown;

function* toIt<T>(iter: T[]) {
    yield* iter;
}

export class Iterator<T> implements AsyncIterableIterator<T> {
    constructor(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
        logger.trace('constructor()');
        const it = Array.isArray(iter) ? toIt(iter) : iter;

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

    public map<R>(fn: MapFn<T, R>) {
        logger.trace('map()');
        return _map(this._iter, fn);
    }

    public filter(predicate: PredicateFn<T>) {
        logger.trace('filter()');
        return _filter(this._iter, predicate);
    }

    public forEach(fn: ForEachFn<T>) {
        logger.trace('forEach()');
        return _forEach(this._iter, fn);
    }

    public find(predicate: PredicateFn<T>) {
        logger.trace('find()');
        return _find(this._iter, predicate);
    }

    public fold(init: T | Promise<T>, fn: FoldFn<T>) {
        logger.trace('fold()');
        return _fold(this._iter, init, fn);
    }

    public fold1(fn: FoldFn<T>) {
        logger.trace('fold1()');
        return _fold1(this._iter, fn);
    }

    public take(n: number) {
        logger.trace('take()');
        return _take(this._iter, n);
    }

    public sum() {
        logger.trace('sum()');
        return _sum(this._iter as any);
    }
}

export function iterator<T>(iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>) {
    logger.trace('iterator()');
    return new Iterator<T>(iter) as IteratorHelper<Iterator<T>>;
}
