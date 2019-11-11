import { isNull } from './isNull.ts';

export function isFunction(a: any): a is Function {
    return isNull(a) ? false : a.constructor === Function;
}
