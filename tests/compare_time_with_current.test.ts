import { compareTimeWithCurrent } from '../src'

describe('compareTimeWithCurrent', () => {
  test('returns "before" when the input time is before the current time', () => {
    const currentTime = new Date()
    const minutes = currentTime.getMinutes() - 1
    const hours = currentTime.getHours() - 1

    const result = compareTimeWithCurrent(`${hours}:${minutes}`)

    expect(result).toBe('before')
  })

  test('returns "after" when the input time is before the current time', () => {
    const currentTime = new Date()
    const minutes = currentTime.getMinutes() + 1
    const hours = currentTime.getHours() + 1

    const result = compareTimeWithCurrent(`${hours}:${minutes}`)

    expect(result).toBe('after')
  })

  test('returns "invalid input" when the input time is not in hh:mm format', () => {
    const result = compareTimeWithCurrent('invalid time')

    expect(result).toBe('invalid input')
  })

  test('returns "invalid input" when the input hours are more than 24', () => {
    const result = compareTimeWithCurrent('25:15')

    expect(result).toBe('invalid input')
  })

  test('returns "invalid input" when the input minutes are more than 60', () => {
    const result = compareTimeWithCurrent('23:61')

    expect(result).toBe('invalid input')
  })

  test('returns "invalid input" when the input hours are a negative number', () => {
    const result = compareTimeWithCurrent('-12:12')

    expect(result).toBe('invalid input')
  })

  test('returns "invalid input" when the input minutes are a negative number', () => {
    const result = compareTimeWithCurrent('12:-12')

    expect(result).toBe('invalid input')
  })
})
