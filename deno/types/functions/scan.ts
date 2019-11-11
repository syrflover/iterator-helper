export type ScanFn<A, B> = (state: B, element: A) => B | Promise<B>;

// export type ScanrFn<A, B> = (element: A, state: B) => B | Promise<B>;
