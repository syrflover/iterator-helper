
import { assert } from 'chai';

import { isIterable } from '../../../src/types/guard/isIterable';

describe('test isIterable', () => {
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

    it('Array == true', () => {
        const actual = isIterable([1, 2, 3, 4]);
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('Iterable == true', () => {
        const actual = isIterable(iterable());
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('AsyncIterable == false', () => {
        const actual = isIterable(asyncIterable());
        const expected = false;

        assert.strictEqual(actual, expected);
    });

    it('undefined == false', () => {
        const actual = isIterable(undefined);
        const expected = false;

        assert.strictEqual(actual, expected);
    });
});
