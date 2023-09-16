import { isDateValid } from '../src'

test('returns true for a valid date object', () => {
  const date = new Date('2023-01-01T10:00:00Z')
  expect(isDateValid(date)).toBe(true)
})

test('returns false for an invalid date object', () => {
  const date = new Date('invalid-date')
  expect(isDateValid(date)).toBe(false)
})

test('returns false for a non-date object', () => {
  const notADate = '2023-01-01T10:00:00Z'
  expect(isDateValid(notADate as any)).toBe(false) // eslint-disable-line
})

test('returns false for an empty string', () => {
  expect(isDateValid('' as any)).toBe(false) // eslint-disable-line
})

test('returns false for null', () => {
  expect(isDateValid(null as any)).toBe(false) // eslint-disable-line
})

test('returns false for undefined', () => {
  expect(isDateValid(undefined as any)).toBe(false) // eslint-disable-line
})
