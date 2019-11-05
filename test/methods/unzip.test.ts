import { assert } from 'chai';

import { iterator } from '../../dist';
import { Pair } from '../../dist/types/pair';

describe('test unzip', () => {
    it('[[1, 5], [2, 6], [3, 7], [4, 8]].unzip()', async () => {
        const a = iterator<Pair<number, number>>([[1, 5], [2, 6], [3, 7], [4, 8]]);

        const actual_left: number[] = [];
        const expected_left = [1, 2, 3, 4];

        const actual_right: number[] = [];
        const expected_right = [5, 6, 7, 8];

        const [left, right] = await a.unzip();

        for await (const _ of left) {
            actual_left.push(_);
        }

        for await (const _ of right) {
            actual_right.push(_);
        }

        assert.deepStrictEqual(actual_left, expected_left);
        assert.deepStrictEqual(actual_right, expected_right);
    });

    it(`[[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']].unzip()`, async () => {
        const a = iterator<Pair<number, string>>([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]);

        const actual_left: number[] = [];
        const expected_left = [1, 2, 3, 4];

        const actual_right: string[] = [];
        const expected_right = ['a', 'b', 'c', 'd'];

        const [left, right] = await a.unzip();

        for await (const _ of left) {
            actual_left.push(_);
        }

        for await (const _ of right) {
            actual_right.push(_);
        }

        assert.deepStrictEqual(actual_left, expected_left);
        assert.deepStrictEqual(actual_right, expected_right);
    });

    it(`[1,2,3,4].zip(['a','b','c','d']).unzip()`, async () => {
        const a = iterator([1, 2, 3, 4]);

        const actual_left: number[] = [];
        const expected_left = [1, 2, 3, 4];

        const actual_right: string[] = [];
        const expected_right = ['a', 'b', 'c', 'd'];

        const [left, right] = await a.zip(['a', 'b', 'c', 'd']).unzip();

        for await (const _ of left) {
            actual_left.push(_);
        }

        for await (const _ of right) {
            actual_right.push(_);
        }

        assert.deepStrictEqual(actual_left, expected_left);
        assert.deepStrictEqual(actual_right, expected_right);
    });
});
