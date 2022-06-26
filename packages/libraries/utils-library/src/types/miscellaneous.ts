type Merge<T, P> = P & Omit<T, keyof P>;

type Func<T = any> = (...args: T[]) => any;

type FuncArguments<T extends Func> = T extends (...args: infer R) => any
  ? R
  : never;

type Dict<T = any> = Record<PropertyKey, T>;

type Booleanish = boolean | 'true' | 'false';

type StringOrNumber = string | number;

type StringUnion<T> = T | (string & Record<never, never>);

type Obj<T = any> = Record<string, T>;

type ObjUnion<T> = T & Obj;

type PropUnion<T> = ObjUnion<T>;

type RequireSome<T extends Obj, S extends keyof T> = Omit<T, S> &
  Required<Pick<T, S>>;

type OmitAndJoinProps<T extends Obj, S extends Obj> = Omit<T, keyof S> & S;

export type {
  Booleanish,
  Dict,
  Func,
  FuncArguments,
  Merge,
  Obj,
  ObjUnion,
  OmitAndJoinProps,
  PropUnion,
  RequireSome,
  StringOrNumber,
  StringUnion,
};
