
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test findMap', () => {
    it('findMap parseInt Succeeded', async () => {
        const a = iterator(['a', 'b', '1', 'c', '2', '3']);

        const actual = await a.findMap((e) => parseInt(e, 10));
        const expected = 1;

        assert.strictEqual(actual, expected);
    });

    it('findMap parseInt Failed', async () => {
        const a = iterator(['a', 'b', 'c', 'd', 'e']);

        const actual = await a.findMap((e) => parseInt(e, 10));
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
