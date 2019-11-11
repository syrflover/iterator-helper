/* eslint-disable */
import { dirname } from 'https://deno.land/std/path/mod.ts';

const ex = ['src/playground.ts', 'src/logger.ts'];
const entries = [];

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf8');

async function main(dir) {
    // await fs.promises.mkdir('dist');

    const files = await Deno.readDir(dir);

    for await (const file of files) {
        try {
            if (ex.includes(`${dir}/${file.name}`)) {
                continue;
            }

            const stat = await Deno.stat(`${dir}/${file.name}`);
            if (stat.isFile()) {
                entries.push(`${dir}/${file.name}`);
            } else if (stat.isDirectory()) {
                await main(`${dir}/${file.name}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

main('src').then(async () => {
    for await (const entry of entries) {
        if (entry.endsWith('_test.ts')) {
            continue;
        }

        const code = await Deno.readFile(entry);

        const to = decoder.decode(code)
            .replace(/const logger.+;/, '')
            .replace(/import { getLogger } from '.+logger\.ts';/, '')
            .replace(/logger\..+\(.+\);/g, '');

        const filepath = entry.replace(/src/, 'deno');

        const dir = dirname(filepath);

        await Deno.mkdir(dir, true);

        await Deno.writeFile(filepath, encoder.encode(to));
    }
});
