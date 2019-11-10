export type PredicateFn<T> = (elem: T) => boolean | Promise<boolean>;
