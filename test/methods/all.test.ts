
import { assert } from 'chai';

import { iterator } from '../../src';

import { Pair } from '../../src/types/pair';

describe('test all', () => {
    it('x > 0', async () => {
        const a = iterator([1, 2, 3]);

        const actual: Pair<boolean, number[]> = [await a.all((e) => e > 0), []];
        const expected: Pair<boolean, number[]> = [true, []];

        for await (const _ of a) {
            actual[1].push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('x > 2', async () => {
        const a = iterator([1, 2, 3]);

        const actual: Pair<boolean, number[]> = [await a.all((e) => e > 2), []];
        const expected: Pair<boolean, number[]> = [false, [2, 3]];

        for await (const _ of a) {
            actual[1].push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual: Pair<boolean, number[]> = [await a.all((e) => e > 3), []];
        const expected: Pair<boolean, number[]> = [true, []];

        for await (const _ of a) {
            actual[1].push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
