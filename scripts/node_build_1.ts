/* eslint-disable */
import { dirname } from 'https://deno.land/std/path/mod.ts';

import { readDir } from './lib/readDir.ts';

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf8');

const entries = readDir('src', ['src/playground.ts', 'src/logger.ts']);

for await (const entry of entries) {
    if (entry.endsWith('_test.ts')) {
        continue;
    }

    const code = await Deno.readFile(entry);

    const to = decoder
        .decode(code)
        .replace(/const logger.+;/, '')
        .replace(/import { getLogger } from \'.+logger\.ts\';/, '')
        .replace(/logger\..+\(.+\);/g, '')
        .replace(/\.ts/g, '');

    const filepath = entry.replace(/src/, '.temp/_ts');

    const dir = dirname(filepath);

    await Deno.mkdir(dir, { recursive: true });

    await Deno.writeFile(filepath, encoder.encode(to));
}
