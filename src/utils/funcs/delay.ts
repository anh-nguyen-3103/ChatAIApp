/**
 * Creates a promise that resolves after the specified milliseconds
 */
export const delay = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Wraps a fetch function with a minimum delay guarantee
 * @param fetchFunction - The async function to execute
 * @param params - Parameters for the fetch function, including optional delayTime
 * @returns Promise resolving to the fetch function's result
 */
export const delayFetching = async <T, P extends { delayTime?: number }>(
  fetchFunction: (params: Omit<P, 'delayTime'>) => Promise<T>,
  params?: P,
): Promise<T> => {
  const start = Date.now();
  const delayTime = params?.delayTime ?? 0;

  // Create a new object without `delayTime`
  const functionParams = { ...params } as Omit<P, 'delayTime'>;
  delete (functionParams as P).delayTime;

  const result = await fetchFunction(functionParams);

  const elapsed = Date.now() - start;
  if (elapsed < delayTime) {
    await delay(delayTime - elapsed);
  }

  return result;
};
