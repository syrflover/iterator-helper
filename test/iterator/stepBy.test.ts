import { assert } from 'chai';

import { iterator } from '../../src';

describe('test stepBy', () => {
    it('stepBy(2)', async () => {
        const a = iterator([0, 1, 2, 3, 4, 5]);

        const actual: number[] = [];
        const expected = [0, 2, 4];

        const it = a.stepBy(2);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('stepBy(Infinity)', async () => {
        const a = iterator([0, 1, 2, 3, 4, 5]);

        const actual: number[] = [];
        const expected = [0];

        const it = a.stepBy(Infinity);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual: number[] = [];
        const expected: number[] = [];

        const it = a.stepBy(2);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
