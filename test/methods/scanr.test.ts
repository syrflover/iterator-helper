import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test scanr', () => {
    it('state + elem', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual_elements: number[] = [];
        const expected_elements = [5, 4, 3, 2, 1];

        const actual_result: number[] = [];
        const expected_result = [16, 15, 13, 10, 6, 1];

        for await (const _ of a.scanr(Promise.resolve(1), (e, st) => {
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
        const expected_elements = [5, 4, 3, 2, 1];

        const actual_result: string[] = [];
        const expected_result = ['154321', '15432', '1543', '154', '15', '1'];

        for await (const _ of a.scanr('1', (e, st) => {
            actual_elements.push(e);
            return `${st}${e}`;
        })) {
            actual_result.push(_);
        }

        assert.deepStrictEqual(actual_elements, expected_elements);
        assert.deepStrictEqual(actual_result, expected_result);
    });
});
