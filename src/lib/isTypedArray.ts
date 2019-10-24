export function isTypedArray(iter: Iterable<any> | AsyncIterable<any>) {
    return ArrayBuffer.isView(iter);
}
