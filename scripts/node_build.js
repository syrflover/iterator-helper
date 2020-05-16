// @ts-nocheck
/* eslint-disable */
const { builtinModules } = require('module');
const typescript = require('rollup-plugin-typescript2');
const ignore = require('rollup-plugin-ignore');
const replace = require('rollup-plugin-re');

const { rollup } = require('rollup');

const fs = require('fs');

const ex = ['src/playground.ts', 'src/logger.ts'];
const entries = [];

async function main(dir) {
    // await fs.promises.mkdir('dist');

    const files = await fs.promises.readdir(dir);

    console.log(dir, files);

    for await (const file of files) {
        try {
            if (ex.includes(`${dir}/${file}`)) {
                continue;
            }

            if (file.endsWith('_test.ts')) {
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
    console.log(entries);

    const a = await rollup(config(entries));
    await a.write({
        dir: 'dist',
        entryFileNames: '[name].js',
        format: 'cjs',
        sourcemap: true,
    });
    // await a.write({ dir: 'es', entryFileNames: '[name].mjs', format: 'es', sourcemap: true });
});

const config = (ent) => {
    const input = {};

    for (const key of ent) {
        input[key.replace('src/', '').replace(/\.ts$/, '')] = key;
        // input[key.replace(/\.ts$/, '')] = key;
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
                        test: /import { getLogger } from '.+logger\.ts';/,
                        replace: '',
                    },
                    {
                        test: /logger\..+\(.+\);/g,
                        replace: '',
                    },
                    {
                        test: /\.ts/g,
                        replace: '',
                    },
                ],
            }),
            typescript({
                tsconfig: 'tsconfig.build.json',
                abortOnError: false,
            }), // so Rollup can convert TypeScript to JavaScript
            // terser(),
        ],
        // output: [{ entryFileNames: '[name].js', format: 'cjs' }],
    };
};
