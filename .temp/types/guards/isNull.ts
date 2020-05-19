/**
 * a is null | undefined | NaN
 */
export function isNull(a: any): a is null | undefined {
    return a === null || a === undefined || Number.isNaN(a);
}
