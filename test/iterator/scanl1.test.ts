import { assert } from 'chai';

import { iterator } from '../../src';

describe('test scanl1', () => {
    it('state + elem', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [2, 3, 4, 5];

        const actual_result: number[] = [];
        const expected_result = [1, 3, 6, 10, 15];

        for await (const _ of a.scanl1((st, e) => {
            actual_elements.push(e);
            return st + e;
        })) {
            actual_result.push(_);
        }

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_result, expected_result);
    });
});
