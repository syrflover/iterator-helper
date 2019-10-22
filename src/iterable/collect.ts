export function _collect<T>(iter: Iterable<T>): T[] {
    const res: T[] = [];

    for (const elem of iter) {
        res.push(elem);
    }

    return res;
}
