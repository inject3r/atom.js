export function shallowEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
  const keysA = Object.keys(a as any);
  const keysB = Object.keys(b as any);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.is((a as any)[k], (b as any)[k]));
}
