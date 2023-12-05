type MemoizedFunction<T> = (...args: unknown[]) => T;

export function memoize<T>(
  functionToMemoize: (...args: unknown[]) => T
): MemoizedFunction<T> {
  if (typeof functionToMemoize !== 'function') {
    throw new Error('Function to be memoized must be a function.');
  }
  const cache = new Map<string, T>();

  return (...args: unknown[]): T => {
    const cachedResult = cache.get(JSON.stringify(args));
    if (cachedResult) {
      return cachedResult;
    }
    const result = functionToMemoize(...args);
    cache.set(JSON.stringify(args), result);
    return result;
  };
}
