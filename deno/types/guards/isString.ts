export function isString(a: any): a is string {
    return a ? a.constructor === String : false;
}
