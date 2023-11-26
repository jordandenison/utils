import { mergeData } from '../src'

const obj1 = { id: '1', updatedAt: '2023-01-01T10:00:00Z' }
const obj1WithNewDate = { id: '1', updatedAt: '2023-01-01T12:00:00Z' }
const obj1WithOlderDate = { id: '1', updatedAt: '2023-01-01T10:00:00Z' }
const obj2 = { id: '2', updatedAt: '2023-01-01T11:00:00Z' }
const obj2WithoutUpdatedAt = { id: '2' }
const obj2WithInvalidDate = { id: '2', updatedAt: 'not-a-date' }
const obj3 = { id: '3', updatedAt: '2023-01-01T11:00:00Z' }
const obj4 = { id: 4, updatedAt: '2023-01-01T10:00:00Z' }
const obj4WithNewDate = { id: 4, updatedAt: '2023-01-01T12:00:00Z' }
const obj4WithOlderDate = { id: 4, updatedAt: '2023-01-01T08:00:00Z' }
const obj5 = { id: 5, updatedAt: '2023-01-01T11:00:00Z' }

describe('mergeData', () => {
  test('returns merged array without duplicates for number IDs', () => {
    const existingData = [obj4, obj5]
    const newData = [obj4WithNewDate, { id: 6, updatedAt: '2023-01-01T13:00:00Z' }]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj4WithNewDate, obj5, { id: 6, updatedAt: '2023-01-01T13:00:00Z' }])
  })

  test('adds new data even without updatedAt field for number IDs', () => {
    const existingData = [obj4]
    const newData = [{ id: 5 }]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj4, { id: 5 }])
  })

  test('does not update existing data if new data has older updatedAt for number IDs', () => {
    const existingData = [obj4WithNewDate]
    const newData = [obj4WithOlderDate]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj4WithNewDate])
  })

  test('handles mixed types of IDs correctly', () => {
    const existingData = [obj1, obj4]
    const newData = [obj1WithNewDate, obj4WithNewDate]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj1WithNewDate, obj4WithNewDate])
  })

  test('returns merged array without duplicates', () => {
    const existingData = [obj1, obj2]
    const newData = [obj1WithNewDate, obj3]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj1WithNewDate, obj2, obj3])
  })

  test('adds new data even without updatedAt field', () => {
    const existingData = [obj1]
    const newData = [obj2WithoutUpdatedAt]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj1, obj2WithoutUpdatedAt])
  })

  test('does not update existing data if new data has older updatedAt', () => {
    const existingData = [obj1WithNewDate]
    const newData = [obj1WithOlderDate]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj1WithNewDate])
  })

  test('does not throw an error when the updatedAt field is not a proper date format for a new item', () => {
    const existingData = [obj1]
    const newData = [obj2WithInvalidDate]

    const result = mergeData(existingData, newData)

    expect(result).toEqual([obj1, obj2WithInvalidDate])
  })

  test('throws an error when the updatedAt field is not a proper date format for an existing item', () => {
    const existingData = [obj2]
    const newData = [obj2WithInvalidDate]

    expect(() => mergeData(existingData, newData)).toThrow(Error)
  })
})
