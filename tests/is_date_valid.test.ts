import { isDateValid } from '../src'

test('returns true for a valid date string', () => {
  const date = '2023-01-01T10:00:00Z'
  expect(isDateValid(date)).toBe(true)
})

test('returns false for an invalid date string', () => {
  const date = 'invalid-date'
  expect(isDateValid(date)).toBe(false)
})

test('returns false for a non-date string', () => {
  const notADate = 'some-random-string'
  expect(isDateValid(notADate)).toBe(false)
})

test('returns false for an empty string', () => {
  expect(isDateValid('')).toBe(false)
})

test('returns false for null', () => {
  expect(isDateValid(null as any)).toBe(false) // eslint-disable-line
})

test('returns false for undefined', () => {
  expect(isDateValid(undefined as any)).toBe(false) // eslint-disable-line
})
