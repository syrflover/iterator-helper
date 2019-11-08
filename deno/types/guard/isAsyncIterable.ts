export function isAsyncIterable(iter: any): iter is AsyncIterable<any> {
    return iter ? !!iter[Symbol.asyncIterator] : false;
}
