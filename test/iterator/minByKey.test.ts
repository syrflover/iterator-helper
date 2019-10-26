import { assert } from 'chai';

import { iterator } from '../../src';

import { Ord } from '../../src/types/ordering';

describe('test minByKey', () => {
    function _cmp<T>(a: T, b: T): Ord {
        if (a > b) {
            return Ord.Less;
        }

        if (a < b) {
            return Ord.Greater;
        }

        return Ord.Equal;
    }

    it('[1,2,-3,4,5,-10].minByKey(Math.abs)', async () => {
        const a = iterator([1, 2, -3, Promise.resolve(4), 5, -10]);

        const actual = await a.minByKey(Math.abs);
        const expected = 1;

        assert.strictEqual(actual, expected);
    });

    it('custom cmp', async () => {
        const a = iterator([1, 2, -3, Promise.resolve(4), 5, -10]);

        const actual = await a.minByKey(Math.abs, _cmp);
        const expected = 10;

        assert.strictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual = await a.minByKey((e) => e);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
