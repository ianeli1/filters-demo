export function Maybe<T extends (...args: any) => any>(
  fn: T | undefined,
  ...args: Parameters<T>
) {
  if (fn) {
    return fn(...args);
  }
  return;
}
