/* eslint-disable */
export async function readDir(dir: string, ex: string[] = []): Promise<string[]> {
    const files = await Deno.readDir(dir);

    const entries: string[] = [];

    for await (const file of files) {
        try {
            if (ex.includes(`${dir}/${file.name}`)) {
                continue;
            }

            const stat = await Deno.stat(`${dir}/${file.name}`);
            if (stat.isFile()) {
                entries.push(`${dir}/${file.name}`);
            } else if (stat.isDirectory()) {
                const entries_d = await readDir(`${dir}/${file.name}`, ex);

                entries.push(...entries_d);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return entries;
}
