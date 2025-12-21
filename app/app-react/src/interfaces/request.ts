export type RegisterResult =
  | { success: true }
  | { success: false; error: unknown };
