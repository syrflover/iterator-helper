import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test scanl', () => {
    it('state + elem', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [1, 2, 3, 4, 5];

        const actual_result: number[] = [];
        const expected_result = [1, 2, 4, 7, 11, 16];

        for await (const _ of a.scanl(Promise.resolve(1), (st, e) => {
            actual_elements.push(e);
            return st + e;
        })) {
            actual_result.push(_);
        }

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_result, expected_result);
    });

    it('`${state}${elem}`', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [1, 2, 3, 4, 5];

        const actual_result: string[] = [];
        const expected_result = ['1', '11', '112', '1123', '11234', '112345'];

        for await (const _ of a.scanl('1', (st, e) => {
            actual_elements.push(e);
            return `${st}${e}`;
        })) {
            actual_result.push(_);
        }

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_result, expected_result);
    });
});
