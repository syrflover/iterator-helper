export function isTypedArray(iter: any) {
    return ArrayBuffer.isView(iter);
}

export function isArrayLike(iter: any): iter is any[] {
    return Array.isArray(iter) || isTypedArray(iter);
}
