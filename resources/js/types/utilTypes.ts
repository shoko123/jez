type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type TupleToObject<T extends readonly unknown[]> = Omit<T, keyof unknown[]>
// type TupleToObject<T extends readonly string[]> = {
//   [P in T[number]]: P
// }

export { Prettify, TupleToObject }
