export type FoldFn<A, B> = (acc: B, elem: A) => B | Promise<B>;
