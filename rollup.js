/* eslint-disable */
const { builtinModules } = require('module');
const typescript = require('rollup-plugin-typescript2');
const ignore = require('rollup-plugin-ignore');
const replace = require('rollup-plugin-re');

const pkg = require('./package.json');

const { rollup } = require('rollup');

const fs = require('fs');

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
    const a = await rollup(config(entries));
    await a.write({ dir: 'dist', entryFileNames: '[name].js', format: 'cjs', sourcemap: true });
    // await a.write({ dir: 'dist', entryFileNames: '[name].mjs', format: 'esm', sourcemap: true });

    await fs.promises.writeFile(
        './dist/package.json',
        JSON.stringify({ ...pkg, main: 'index.js', types: 'index.d.ts', devDependencies: {}, scripts: {} }, null, 4),
    );
});

const config = (ent) => {
    const input = {};

    for (const key of ent) {
        input[key.replace('src/', '').replace(/\.ts$/, '')] = key;
    }

    return {
        input,
        //  cache: false,
        plugins: [
            ignore([...builtinModules, 'log4js']),
            replace({
                patterns: [
                    {
                        test: /const logger.+;/,
                        replace: '',
                    },
                    {
                        test: /logger\..+\(.+\);/g,
                        replace: '',
                    },
                    {
                        test: /import { getLogger } from '.+logger';/,
                        replace: '',
                    },
                ],
            }),
            typescript({
                tsconfig: 'tsconfig.build.json',
            }), // so Rollup can convert TypeScript to JavaScript
            // terser(),
        ],
        // output: [{ entryFileNames: '[name].js', format: 'cjs' }],
    };
};
