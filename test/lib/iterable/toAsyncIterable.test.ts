import { assert } from 'chai';
import { toAsyncIterable } from '../../../src/lib/iterable';

describe('test toAsyncIterable', () => {
    function* iterable(): Iterable<number> {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }

    async function* asyncIterable(): AsyncIterable<number> {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }

    it('from Array', async () => {
        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const iter = toAsyncIterable([1, 2, 3, 4]);

        for await (const _ of iter) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
        assert.ok(Symbol.asyncIterator in iter);
    });

    it('from Iterable', async () => {
        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const iter = toAsyncIterable(iterable());

        for await (const _ of iter) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
        assert.ok(Symbol.asyncIterator in iter);
    });

    it('from AsyncIterable', async () => {
        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const iter = toAsyncIterable(asyncIterable());

        for await (const _ of iter) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
        assert.ok(Symbol.asyncIterator in iter);
    });

    it('from Promise Array', async () => {
        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const iter = toAsyncIterable(Promise.resolve([1, 2, 3, 4]));

        for await (const _ of iter) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
        assert.ok(Symbol.asyncIterator in iter);
    });

    it('from Promise Iterable', async () => {
        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const iter = toAsyncIterable(Promise.resolve(iterable()));

        for await (const _ of iter) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
        assert.ok(Symbol.asyncIterator in iter);
    });

    it('from Promise AsyncIterable', async () => {
        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const iter = toAsyncIterable(Promise.resolve(asyncIterable()));

        for await (const _ of iter) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
        assert.ok(Symbol.asyncIterator in iter);
    });
});
