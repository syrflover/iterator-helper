import { assert } from 'chai';

import { iterator } from '../../src';

describe('test scanr1', () => {
    it('state + elem', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [4, 3, 2, 1];

        const actual_result: number[] = [];
        const expected_result = [15, 14, 12, 9, 5];

        for await (const _ of a.scanr1((e, st) => {
            actual_elements.push(e);
            return st + e;
        })) {
            actual_result.push(_);
        }

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_result, expected_result);
    });
});
