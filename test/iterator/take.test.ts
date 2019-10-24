import { assert } from 'chai';

import { iterator } from '../../src';

describe('test take', () => {
    it('take(4)', async () => {
        const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const it = a.take(4);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('take(Infinity)', async () => {
        const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8];

        const it = a.take(Infinity);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
