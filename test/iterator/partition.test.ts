import { assert } from 'chai';

import { iterator } from '../../src';

describe('test partition', () => {
    it('even', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_left: number[] = [];
        const expected_left = [2, 4];

        const actual_right: number[] = [];
        const expected_right = [1, 3, 5];

        const [left, right] = await a.partition((e) => e % 2 === 0);

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
