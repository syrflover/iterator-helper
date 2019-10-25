import { assert } from 'chai';

import { iterator } from '../../src';

describe('test drop', () => {
    it('drop(4)', async () => {
        const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

        const actual: number[] = [];
        const expected = [5, 6, 7, 8];

        const it = a.drop(4);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('drop(Infinity)', async () => {
        const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

        const actual: number[] = [];
        const expected: number[] = [];

        const it = a.drop(Infinity);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
