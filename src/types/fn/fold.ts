export type FoldFn<T> = (acc: T, elem: T) => T | Promise<T>;
