function assert(condition: unknown, msg?: string): asserts condition {
  if (condition === false) throw new Error(msg)
}

function makeDate(iso5801: string) {
  const date = new Date(iso5801)
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}

function makeUnixDateNumber(iso5801: string) {
  return makeDate(iso5801).getTime()
}

function dateToISO8601String(date: Date | null) {
  return date ? date.toISOString().substring(0, 10) : null
}

function shiftedNumericLabel(value: number | null, shift: number) {
  return value ? value / Math.pow(10, shift) : null
}

function copyProperties<T extends object, K extends keyof T, A extends object>(
  source: T,
  keysToOmit: K[],
  propertiesToAdd: A,
): Omit<T, K> & A {
  const { ...copied } = source

  keysToOmit.forEach((key) => {
    delete copied[key]
  })

  return { ...copied, ...propertiesToAdd }
}

export {
  assert,
  makeDate,
  makeUnixDateNumber,
  dateToISO8601String,
  copyProperties,
  shiftedNumericLabel,
}
