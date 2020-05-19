import { isNull } from './isNull';

export function isPromise(a: any): a is Promise<any> {
    return isNull(a) ? false : a.constructor === Promise;
}
