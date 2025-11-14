export interface ErrorResponseDetailShape {
  type: string;
  loc: string[];
  msg: string;
  ctx: { [key: string]: unknown };
  input: unknown;
}

export type ErrorDetailField = ErrorResponseDetailShape[] | string | unknown;
