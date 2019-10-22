import { IterableHelper } from './iterable';
import { logger } from './logger';

const a = new IterableHelper([1, 2, 3, 4]).map((e) => e + 1).collect();
logger.debug(a);
