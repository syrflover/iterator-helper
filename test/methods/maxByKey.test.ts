import { assert } from 'chai';

import { iterator } from '../../src';

import { Ord } from '../../src/types/ordering';

describe('test maxByKey', () => {
    function _cmp<T>(a: T, b: T): Ord {
        if (a > b) {
            return Ord.Less;
        }

        if (a < b) {
            return Ord.Greater;
        }

        return Ord.Equal;
    }

    it('[1,2,-3,4,5,-10].maxByKey(Math.abs)', async () => {
        const a = iterator([1, 2, -3, Promise.resolve(4), 5, -10]);

        const actual = await a.maxByKey(Math.abs);
        const expected = -10;

        assert.strictEqual(actual, expected);
    });

    it('object', async () => {
        const a = [{ a: 6, b: 11 }, { a: 4, b: 7 }, { a: 1, b: 5 }, { a: 3, b: 2 }, { a: 11, b: 1 }, { a: 5, b: 4 }, { a: 2, b: 3 }, { a: 7, b: 6 }];

        const actual_a = await iterator(a).maxByKey((e) => e.a);
        const expected_a = { a: 11, b: 1 };

        const actual_b = await iterator(a).maxByKey((e) => e.b);
        const expected_b = { a: 6, b: 11 };

        assert.deepStrictEqual(actual_a, expected_a);
        assert.deepStrictEqual(actual_b, expected_b);
    });

    it('custom cmp', async () => {
        const a = iterator([1, 2, -3, Promise.resolve(4), 5, -10]);

        const actual = await a.maxByKey(Math.abs, _cmp);
        const expected = 1;

        assert.strictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual = await a.maxByKey((e) => e);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
