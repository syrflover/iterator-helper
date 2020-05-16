import { readDir } from './lib/readDir.ts';

readDir(Deno.args.some((e) => e === 'publish') ? 'deno' : 'src')
    .then(async (e) => [...e, ...(await readDir('scripts'))])
    .then(async (entries) => {
        const targets = entries.join(' ');

        /* const ignore = decoder.decode(await Deno.readFile('.prettierignore'))
        .split('\n')
        .filter((e) => e.length > 0)
        .join(' ');

    console.debug(ignore); */

        const reload = Deno.args.some((e) => e === 'reload') ? '--reload' : '';

        const prettier = 'https://deno.land/std/prettier/main.ts';
        const permissions = '--allow-write --allow-read';
        const options = `${reload} --single-quote --arrow-parens always --print-width 140 --tab-width 4 --trailing-comma all`.trim();

        const task = Deno.run({
            args: `deno run ${permissions} ${prettier} ${options} ${targets}`.split(' '),
        });

        const { code } = await task.status();

        Deno.exit(code);
    });
