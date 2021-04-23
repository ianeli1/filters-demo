export function Maybe<T extends (...args: any) => any>(
  fn: T | undefined,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  if (fn) {
    return fn(...args);
  }
  return;
}
