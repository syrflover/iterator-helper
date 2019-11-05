
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test flatMap', () => {
    it(`[\`it's Sunny in\`, '', 'California'] split(' ')`, async () => {
        const a = iterator([`it's Sunny in`, '', 'California']);

        const actual: string[] = [];
        const expected = [`it's`, 'Sunny', 'in', '', 'California'];

        for await (const _ of a.flatMap((e) => e.split(' '))) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('[[1,2,3],[4,5,6]] * 2', async () => {
        const a = iterator([[1, 2, 3], [4, 5, 6]]);

        const actual: (number | number[])[] = [];
        const expected = [2, 4, 6, 8, 10, 12];

        for await (const _ of a.flatMap((e) => e.map((ee) => ee * 2))) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
