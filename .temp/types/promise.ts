export type ExtractPromise<T> = T extends Promise<infer P> ? P : T;

export type EP<T> = ExtractPromise<T>;
