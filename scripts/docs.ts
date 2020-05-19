import { exists } from 'https://deno.land/std/fs/mod.ts';

const decoder = new TextDecoder('utf-8');

async function docsGen(version: string) {
    const task = Deno.run({
        cmd: `./node_modules/.bin/typedoc --options typedoc.json --name @syrflover/iterator@${version} --gitRevision ${version} --out docs/${version}`.split(
            ' ',
        ),
    });

    const { code } = await task.status();

    if (code !== 0) {
        Deno.exit(code);
    }
}

async function main() {
    const MASTER = 'master';
    const { version: VERSION } = await Deno.realPath('./package.json')
        .then((r) => Deno.readFile(r))
        .then((r) => decoder.decode(r))
        .then((r) => JSON.parse(r)); // decoder.decode(await Deno.readFile(await Deno.realPath('./package.json')));

    if (Deno.args.some((e) => e === 'onlyMaster')) {
        if (await exists(`docs/${MASTER}`)) {
            await Deno.remove(`docs/${MASTER}`, { recursive: true });
        }
        await docsGen(MASTER);
        return;
    }
    if (await exists(`docs/${MASTER}`)) {
        await Deno.remove(`docs/${MASTER}`, { recursive: true });
    }
    if (await exists(`docs/v${VERSION}`)) {
        await Deno.remove(`docs/v${VERSION}`, { recursive: true });
    }
    await docsGen(MASTER);
    await docsGen(`v${VERSION}`);
}

main();
