/* eslint-disable */
export async function* readDir(dir: string, ex: string[] = []): AsyncIterable<string> {
    const files = Deno.readDir(dir);

    // const entries: string[] = [];

    for await (const file of files) {
        try {
            if (ex.includes(`${dir}/${file.name}`)) {
                continue;
            }

            const stat = await Deno.stat(`${dir}/${file.name}`);
            if (stat.isFile) {
                yield `${dir}/${file.name}`;
                // entries.push(`${dir}/${file.name}`);
            } else if (stat.isDirectory) {
                const entries_d = readDir(`${dir}/${file.name}`, ex);

                yield* entries_d;
                // entries.push(...entries_d);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // yield entries;
}
