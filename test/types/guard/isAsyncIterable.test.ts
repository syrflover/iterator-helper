
import { assert } from 'chai';

import { isAsyncIterable } from '../../../src/types/guard/isAsyncIterable';

describe('test isAsyncIterable', () => {
    function* iterable() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }

    async function* asyncIterable() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }

    it('Array == false', () => {
        const actual = isAsyncIterable([1, 2, 3, 4]);
        const expected = false;

        assert.strictEqual(actual, expected);
    });

    it('Iterable == false', () => {
        const actual = isAsyncIterable(iterable());
        const expected = false;

        assert.strictEqual(actual, expected);
    });

    it('AsyncIterable == true', () => {
        const actual = isAsyncIterable(asyncIterable());
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('undefined == false', () => {
        const actual = isAsyncIterable(undefined);
        const expected = false;

        assert.strictEqual(actual, expected);
    });
});
