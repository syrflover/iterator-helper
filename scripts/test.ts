/* eslint-disable */
const entries: string[] = [];

async function main(dir: string) {
    const ex = ['src/playground.ts', 'src/logger.ts', 'src/iterator.ts'];

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
            console.error(file.name, error);
        }
    }
}

main('src')
    .then(async () => {
        const ex = [/src\/types\/[a-z]+\.ts/i, /src\/types\/functions\/[a-z]+\.ts/i];

        const sources: string[] = [];
        const tests = entries.filter((e) => e.endsWith('_test.ts'));

        entriesLabel: for await (const e of entries) {
            if (e.endsWith('mod.ts')) {
                continue;
            }

            for (const r of ex) {
                if (r.test(e)) {
                    continue entriesLabel;
                }
            }

            sources.push(e);
        }


        sourcesLabel: for (const source of sources) {
            const withoutExt = source.replace(/\.ts$/, '');

            for (const test of tests) {
                if (test.startsWith(withoutExt)) {
                    continue sourcesLabel;
                }
            }

            console.error(`Not Found Test of "${source}"`);
            Deno.exit(1);
        }

        return tests;
    })
    .then(async (tests) => {
        const reload = Deno.args.includes('reload') ? ' --reload' : '';
        const testOpts = `--allow-net${reload} --config tsconfig.test.json ${tests.join(' ')}`;

        const test = Deno.run({
            args: `deno test ${testOpts}`.split(' '),
        });

        const { code } = await test.status();

        Deno.exit(code);
    });
