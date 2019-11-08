/* eslint-disable */
const fs = require('fs');
const path = require('path');

const ex = ['src/playground.ts', 'src/logger.ts'];
const entries = [];

async function main(dir) {
    // await fs.promises.mkdir('dist');

    const files = await fs.promises.readdir(dir);

    for await (const file of files) {
        try {
            if (ex.includes(`${dir}/${file}`)) {
                continue;
            }

            const stat = await fs.promises.stat(`${dir}/${file}`);
            if (stat.isFile()) {
                entries.push(`${dir}/${file}`);
            } else {
                await main(`${dir}/${file}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

main('src').then(async () => {
    for await (const entry of entries) {
        const code = await fs.promises.readFile(entry, { encoding: 'utf8' });

        const to = code
            .replace(/const logger.+;/, '')
            .replace(/import { getLogger } from '.+logger\.ts';/, '')
            .replace(/logger\..+\(.+\);/g, '');

        const filepath = entry.replace(/src/, 'deno');

        const dir = path.dirname(filepath);

        await fs.promises.mkdir(dir, { recursive: true });

        await fs.promises.writeFile(filepath, to, { encoding: 'utf8' });
    }
});
