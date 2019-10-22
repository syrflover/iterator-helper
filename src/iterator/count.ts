export function _count<T>(iter: Iterable<T>) {
    let count = 0;

    for (const _ of iter) {
        count += 1;
    }

    return count;
}
