export function _find<T>(iter: Iterable<T>, predicate: (elem: T) => boolean) {
    for (const elem of iter) {
        if (predicate(elem)) {
            return elem;
        }
    }
}
