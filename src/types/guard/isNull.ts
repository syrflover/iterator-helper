/**
 * v is null | undefined | NaN
 */
export function isNull(v: any): v is null | undefined {
    return v === null || v === undefined || Number.isNaN(v);
}
