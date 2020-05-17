/* eslint-disable */
import { $ } from '../src/lib/utils/mod.ts';
import { collect } from '../src/methods/mod.ts';

async function* getFileNamesInDirectory(dir: string): AsyncIterable<string> {
    const excludes = ['src/playground.ts', 'src/logger.ts', 'src/iterator.ts'];

    const files = Deno.readDir(dir);

    for await (const file of files) {
        try {
            if (excludes.includes(`${dir}/${file.name}`)) {
                continue;
            }

            const stat = await Deno.stat(`${dir}/${file.name}`);
            if (stat.isFile) {
                yield `${dir}/${file.name}`;
            } else if (stat.isDirectory) {
                yield* getFileNamesInDirectory(`${dir}/${file.name}`);
            }
        } catch (error) {
            console.error(file.name, error);
        }
    }
}

async function filterSourceFiles(files: string[]) {
    // const excludes = ['src/types/']; // [/src\/types\/[a-z]+\.ts/i, /src\/types\/functions\/[a-z]+\.ts/i];

    return files.filter((file) => {
        if (file.endsWith('mod.ts')) {
            return false;
        }

        if (file.endsWith('_test.ts')) {
            return false;
        }

        // const isExclude = excludes.some((exclude) => exclude.test(file));

        if (file.startsWith('src/types/')) {
            return false;
        }

        return true;
    });
}

function hasAllTestFiles(files: string[], testFiles: string[]) {
    l: for (const file of files) {
        const withTestExt = file.replace(/\.ts$/, '_test.ts');

        for (const testFile of testFiles) {
            if (testFile.includes(withTestExt)) {
                continue l;
            }
        }

        console.error(`Not Found Test File of "${file}"`);
        Deno.exit(1);
    }
}

async function runTest(testFiles: string[]) {
    const reload = Deno.args.includes('reload') ? ' --reload' : '';
    const testOpts = `--unstable${reload} --config tsconfig.test.json ${testFiles.join(' ')}`;

    const test = Deno.run({
        cmd: `deno test ${testOpts}`.split(' '),
    });

    const { code } = await test.status();

    Deno.exit(code);
}

async function main() {
    const files = await $(getFileNamesInDirectory('src'), collect);

    const sourceFiles = await filterSourceFiles(files);
    const testFiles = files.filter((sourceFile) => sourceFile.endsWith('_test.ts'));

    hasAllTestFiles(sourceFiles, testFiles);

    await runTest(testFiles);
}

main();
