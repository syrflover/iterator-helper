import pkg from '../package.json';

const MASTER = 'master';
const { version: VERSION } = pkg;

async function docsGen(version: string) {
    const task = Deno.run({
        args: `./node_modules/.bin/typedoc --options typedoc.json --gitRevision ${version} --out docs/${version}`.split(' '),
    });

    const { code } = await task.status();

    if (code !== 0) {
        Deno.exit(code);
    }
}

async function main() {
    if (Deno.args.some((e) => e === 'onlyMaster')) {
        await docsGen(MASTER);
        return;
    }
    await docsGen(MASTER);
    await docsGen(`v${VERSION}`);
}

main();
