import { isNull } from './isNull.ts';

export function isString(a: any): a is string {
    return isNull(a) ? false : a.constructor === String;
}
