import { isNull } from './isNull';

export function isFunction(a: any): a is Function {
    return isNull(a) ? false : a.constructor === Function;
}
