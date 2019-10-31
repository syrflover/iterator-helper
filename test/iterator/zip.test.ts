import { assert } from 'chai';

import { iterator } from '../../dist';
import { Pair } from '../../dist/types/pair';

describe('test zip', () => {
    it('[1,2,3,4].zip([5,6,7,8])', async () => {
        const a = iterator([1, 2, 3, 4]);

        const actual: Pair<number, number>[] = [];
        const expected: Pair<number, number>[] = [[1, 5], [2, 6], [3, 7], [4, 8]];

        const it = a.zip([5, 6, 7, 8]);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it(`[1,2,3,4].zip(['a','b','c','d','e'])`, async () => {
        const a = iterator([1, 2, 3, 4]);

        const actual: Pair<number, string>[] = [];
        const expected: Pair<number, string>[] = [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']];

        const it = a.zip(['a', 'b', 'c', 'd', 'e']);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual: Pair<number, number>[] = [];
        const expected: Pair<number, number>[] = [];

        const it = a.zip([5, 6, 7, 8, 9]);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
