import { isArrayLike } from './isArrayLike.ts';
import { isString } from './isString.ts';

export function isArrayLikeOrString(iter: any): iter is string | any[] {
    return isArrayLike(iter) || isString(iter);
}
