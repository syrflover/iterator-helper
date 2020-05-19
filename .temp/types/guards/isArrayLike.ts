export function isTypedArray(a: any) {
    return ArrayBuffer.isView(a);
}

export function isArrayLike(a: any): a is any[] {
    return Array.isArray(a) || isTypedArray(a);
}
