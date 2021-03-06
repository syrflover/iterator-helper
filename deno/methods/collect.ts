import { fold } from "./fold.ts";

export function collect<T>(iter: AsyncIterable<T>): Promise<T[]> {
  return fold((acc: T[], e: T) => [...acc, e], [] as T[], iter);
}
