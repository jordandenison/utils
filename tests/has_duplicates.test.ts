import { hasDuplicates } from '../src'

describe('hasDuplicates', () => {
  test('returns false when no duplicates found', async () => {
    const arr = [{ prop1: 'hi' }, { prop1: 'hello' }]

    const result = hasDuplicates(arr, 'prop1')

    expect(result).toBe(false)
  })

  test('returns true when duplicates found', async () => {
    const arr = [{ prop1: 'hi' }, { prop1: 'hi' }]

    const result = hasDuplicates(arr, 'prop1')

    expect(result).toBe(true)
  })

  test('returns false when no duplicates found for objects with more than one property', async () => {
    const arr = [
      { prop1: 'hi', prop2: 'hi2' },
      { prop1: 'hello', prop2: 'hello2' }
    ]

    const result = hasDuplicates(arr, 'prop2')

    expect(result).toBe(false)
  })

  test('returns true when duplicates found for objects with more than one property', async () => {
    const arr = [
      { prop1: 'hi', prop2: 'hello' },
      { prop1: 'hi', prop2: 'hello' }
    ]

    const result = hasDuplicates(arr, 'prop2')

    expect(result).toBe(true)
  })
})
