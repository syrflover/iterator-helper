import { assert } from 'chai';

import { cons } from '../../../src/lib/cons';

describe('test cons', () => {
    it('0:[1]', async () => {
        const actual: number[] = [];
        const expected = [0, 1];

        for await (const _ of cons(0, [1])) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
