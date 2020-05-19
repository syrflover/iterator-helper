export type FoldFn<A, B> = (accumulator: B, elem: A) => B | Promise<B>;

// export type FoldrFn<A, B> = (elem: A, accumulator: B) => B | Promise<B>;
