/**
 * Converts snake_case keys to camelCase recursively.
 * Use this to transform Supabase responses to TypeScript conventions.
 *
 * @example
 * const { data } = await supabase.from("users").select("*");
 * return toCamelCase<User[]>(data);
 */
export function toCamelCase<T>(obj: unknown): T {
  if (obj === null || obj === undefined) return obj as T;

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as T;
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, l) => l.toUpperCase());
      result[camelKey] = toCamelCase(value);
    }
    return result as T;
  }

  return obj as T;
}
