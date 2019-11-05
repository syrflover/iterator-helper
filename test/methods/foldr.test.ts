import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test foldr', () => {
    it('sum', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [5, 4, 3, 2, 1];

        const actual_accumulator_without_result: number[] = [];
        const expected_accumulator_without_result = [1, 6, 10, 13, 15];

        const actual_result = await a.foldr(Promise.resolve(1), (e, acc) => {
            actual_elements.push(e);
            actual_accumulator_without_result.push(acc);
            return acc + e;
        });
        const expected_result = 16;

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_accumulator_without_result, expected_accumulator_without_result);
        assert.strictEqual(actual_result, expected_result);
    });
});
