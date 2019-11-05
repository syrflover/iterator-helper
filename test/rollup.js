/* eslint-disable */
const { builtinModules } = require('module');
const typescript = require('rollup-plugin-typescript2');
const replace = require('rollup-plugin-re');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

const { rollup } = require('rollup');

const fs = require('fs');

const ex = ['test/__cjs', 'test/__es'];
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

main('test').then(async () => {
    const cjs = await rollup(config(entries, 'dist'));
    await cjs.write({ dir: 'test/__cjs', entryFileNames: '[name].js', format: 'cjs', sourcemap: false });

    // const esm = await rollup(config(entries, 'es'));
    // await esm.write({ dir: 'test/__es', entryFileNames: '[name].mjs', format: 'es', sourcemap: false, exports: 'auto' });
});

const config = (ent, module_directory) => {
    const input = {};

    for (const key of ent) {
        input[key.replace('test/', '').replace(/\.ts$/, '')] = key;
    }

    const patterns = [
        {
            test: /src/,
            replace: module_directory,
        },
    ];

    let plugins = [
        // ignore([...builtinModules]),

        replace({
            patterns,
        }),
        resolve({
            preferBuiltins: false,
        }),
        commonjs({
            include: ['node_modules/**', `${module_directory}/**`],
            namedExports: { chai: ['assert'], mocha: ['describe'] },
        }),
        typescript({
            tsconfig: 'tsconfig.test.json',
            tsconfigOverride: { compilerOptions: { target: 'esnext', module: 'esnext' } },
        }), // so Rollup can convert TypeScript to JavaScript
        // terser(),
    ];

    return {
        input,
        //  cache: false,
        plugins,
        // output: [{ entryFileNames: '[name].js', format: 'cjs' }],
    };
};
