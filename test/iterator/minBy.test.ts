import { assert } from 'chai';

import { iterator } from '../../src';

import { cmp } from '../../src/iterator/lib/cmp';
import { Ord } from '../../src/types/ordering';

describe('test minBy', () => {
    function _cmp<T>(a: T, b: T): Ord {
        if (a > b) {
            return Ord.Less;
        }

        if (a < b) {
            return Ord.Greater;
        }

        return Ord.Equal;
    }

    it('[1,2,3,4,5]', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.minBy(cmp);
        const expected = 1;

        assert.strictEqual(actual, expected);
    });

    it('custom cmp', async () => {
        const i = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await i.minBy(_cmp);
        const expected = 5;

        assert.strictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual = await a.minBy(cmp);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
