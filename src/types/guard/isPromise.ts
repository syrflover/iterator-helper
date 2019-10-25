export function isPromise(a: any): a is Promise<any> {
    return a.constructor === Promise;
}
