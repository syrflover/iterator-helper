/* eslint-disable */
import { dirname } from 'https://deno.land/std/path/mod.ts';

import { readDir } from './lib/readDir.ts';

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf8');

readDir('src', ['src/playground.ts', 'src/logger.ts']).then(async (entries) => {
    for await (const entry of entries) {
        if (entry.endsWith('_test.ts')) {
            continue;
        }

        const code = await Deno.readFile(entry);

        const to = decoder
            .decode(code)
            .replace(/const logger.+;/, '')
            .replace(/import { getLogger } from '.+logger\.ts';/, '')
            .replace(/logger\..+\(.+\);/g, '');

        const filepath = entry.replace(/src/, 'deno');

        const dir = dirname(filepath);

        await Deno.mkdir(dir, true);

        await Deno.writeFile(filepath, encoder.encode(to));
    }
});
