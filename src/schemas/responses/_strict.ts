/**
 * Recursively strips the `[k: string]: unknown` index signature that
 * Zod 4's `looseObject` adds to inferred types. Gives consumers clean
 * types where only explicitly declared properties are accessible, at
 * every nesting level.
 *
 * Preserves Date, RegExp, and other built-in objects as-is.
 */
export type Strict<T> = T extends Date | RegExp | Map<any, any> | Set<any>
  ? T
  : T extends readonly (infer U)[]
    ? Strict<U>[]
    : T extends object
      ? { [K in keyof T as string extends K ? never : K]: Strict<T[K]> }
      : T;
