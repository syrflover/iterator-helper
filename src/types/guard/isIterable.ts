export function isIterable(iter: any): iter is Iterable<any> {
    return iter ? !!iter[Symbol.iterator] : false;
}
