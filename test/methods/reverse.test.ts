
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test reverse', () => {
    it('reverse', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual: number[] = [];
        const expected = [5, 4, 3, 2, 1];

        for await (const _ of a.reverse()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
