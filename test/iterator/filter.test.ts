import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test filter', () => {
    it('even', async () => {
        const a = new Iterator([1, 2, 3, 4, 5, 6]);

        const actual: number[] = [];
        const expected = [2, 4, 6];

        for await (const _ of a.filter((e) => e % 2 === 0)) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
