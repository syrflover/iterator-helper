
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test foldl', () => {
    it('sum', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [1, 2, 3, 4, 5];

        const actual_accumulator_without_result: number[] = [];
        const expected_accumulator_without_result = [1, 2, 4, 7, 11];

        const actual_result = await a.foldl(Promise.resolve(1), (acc, e) => {
            actual_elements.push(e);
            actual_accumulator_without_result.push(acc);
            return acc + e;
        });
        const expected_result = 16;

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_accumulator_without_result, expected_accumulator_without_result);
        assert.strictEqual(actual_result, expected_result);
    });

    it('`${acc}${e}`', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [1, 2, 3, 4, 5];

        const actual_accumulator_without_result: string[] = [];
        const expected_accumulator_without_result = ['1', '11', '112', '1123', '11234'];

        const actual_result = await a.foldl('1', (acc, e) => {
            actual_elements.push(e);
            actual_accumulator_without_result.push(acc);
            return `${acc}${e}`;
        });
        const expected_result = '112345';

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_accumulator_without_result, expected_accumulator_without_result);
        assert.strictEqual(actual_result, expected_result);
    });
});
