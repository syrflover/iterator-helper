
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test flatten', () => {
    it('[1,2,3,Promise<4>,5,[Promise<6>,7],AsyncIterator_<8,9>,10]', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5, [Promise.resolve(6), 7], iterator([8, 9]), 10]);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        for await (const _ of a.flatten()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('[1,[2, [3]]] == [1, 2, [3]]', async () => {
        const a = iterator([1, [2, [3]]]);

        const actual: (number | number[])[] = [];
        const expected = [1, 2, [3]];

        for await (const _ of a.flatten()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('[1,2,3] == [1,2,3]', async () => {
        const a = iterator([1, 2, 3]);

        const actual: number[] = [];
        const expected = [1, 2, 3];

        for await (const _ of a.flatten()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
