import '../../src/types/global';


import { assert } from 'chai';

describe('test prototype.iter()', () => {
    it('String', async () => {
        const a = 'hello world';

        const actual: string[] = [];
        const expected = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
