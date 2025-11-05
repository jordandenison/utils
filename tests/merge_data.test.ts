import { mergeData } from '../src'

const obj1 = { id: '1', updatedAt: '2023-01-01T10:00:00Z' }
const obj1Extra = { ...obj1, hasBot: true }
const obj1WithNewDate = { id: '1', updatedAt: '2023-01-01T12:00:00Z' }
const obj1WithOlderDate = { id: '1', updatedAt: '2023-01-01T08:00:00Z' }

const obj2 = { id: '2', updatedAt: '2023-01-01T11:00:00Z' }
const obj2WithoutUpdatedAt = { id: '2' }
const obj2WithInvalidDate = { id: '2', updatedAt: 'not-a-date' }

const obj3 = { id: '3', updatedAt: '2023-01-01T11:00:00Z' }

const obj4 = { id: 4, updatedAt: '2023-01-01T10:00:00Z' }
const obj4WithNewDate = { id: 4, updatedAt: '2023-01-01T12:00:00Z' }
const obj4WithOlderDate = { id: 4, updatedAt: '2023-01-01T08:00:00Z' }

describe('mergeData', () => {
  test('preserves extra fields on existing item when merging a newer item', () => {
    const existingData = [obj1Extra]
    const newData = [obj1WithNewDate]
    const result = mergeData(existingData, newData, { preserveOld: true })
    expect(result).toEqual([{ id: '1', updatedAt: '2023-01-01T12:00:00Z', hasBot: true }])
  })

  test('merges new fields into existing item when incoming adds properties', () => {
    const existingData = [{ id: 'X', updatedAt: '2023-01-01T10:00:00Z', extraField: 'foo' }]
    const newData = [{ id: 'X', updatedAt: '2023-01-01T11:00:00Z', newField: 'bar' }]
    const result = mergeData(existingData, newData, { preserveOld: true })
    expect(result).toEqual([
      {
        id: 'X',
        updatedAt: '2023-01-01T11:00:00Z',
        extraField: 'foo',
        newField: 'bar'
      }
    ])
  })

  test('returns merged array without duplicates for number IDs', () => {
    const existingData = [obj4, { id: 5, updatedAt: '2023-01-01T09:00:00Z' }]
    const newData = [obj4WithNewDate, { id: 6, updatedAt: '2023-01-01T13:00:00Z' }]

    const result = mergeData(existingData, newData)
    expect(result).toEqual([
      obj4WithNewDate,
      { id: 5, updatedAt: '2023-01-01T09:00:00Z' },
      { id: 6, updatedAt: '2023-01-01T13:00:00Z' }
    ])
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

  test('handles mixed types of IDs correctly and preserves extra fields', () => {
    const existingData = [obj1Extra, obj4]
    const newData = [obj1WithNewDate, obj4WithNewDate]

    const result = mergeData(existingData, newData, { preserveOld: true })
    expect(result).toEqual([{ id: '1', updatedAt: '2023-01-01T12:00:00Z', hasBot: true }, obj4WithNewDate])
  })

  test('returns merged array without duplicates for string IDs and preserves extra fields', () => {
    const existingData = [obj1Extra, obj2]
    const newData = [obj1WithNewDate, obj3]

    const result = mergeData(existingData, newData, { preserveOld: true })
    expect(result).toEqual([{ id: '1', updatedAt: '2023-01-01T12:00:00Z', hasBot: true }, obj2, obj3])
  })

  test('adds new data even without updatedAt field for string IDs', () => {
    const existingData = [obj1]
    const newData = [obj2WithoutUpdatedAt]

    const result = mergeData(existingData, newData)
    expect(result).toEqual([obj1, obj2WithoutUpdatedAt])
  })

  test('does not update existing data if new data has older updatedAt for string IDs', () => {
    const existingData = [obj1WithNewDate]
    const newData = [obj1WithOlderDate]

    const result = mergeData(existingData, newData)
    expect(result).toEqual([obj1WithNewDate])
  })

  test('does not throw when updatedAt is invalid on a new item', () => {
    const existingData = [obj1]
    const newData = [obj2WithInvalidDate]

    const result = mergeData(existingData, newData)
    expect(result).toEqual([obj1, obj2WithInvalidDate])
  })

  test('throws when updatedAt is invalid on an existing item', () => {
    const existingData = [obj2]
    const newData = [obj2WithInvalidDate]

    expect(() => mergeData(existingData, newData)).toThrow(Error)
  })

  test('preserveOld: true - preserves extra frontend-only fields', () => {
    const existingData = [obj1Extra]
    const newData = [obj1WithNewDate]

    const result = mergeData(existingData, newData, { preserveOld: true })
    expect(result).toEqual([{ id: '1', updatedAt: '2023-01-01T12:00:00Z', hasBot: true }])
  })

  test('preserveOld: false - drops extra fields from old item', () => {
    const existingData = [obj1Extra]
    const newData = [obj1WithNewDate]

    const result = mergeData(existingData, newData, { preserveOld: false })
    expect(result).toEqual([{ id: '1', updatedAt: '2023-01-01T12:00:00Z' }])
  })

  test('preserveOld: false - full replacement of object if newer', () => {
    const existingData = [{ id: 'Z', updatedAt: '2023-01-01T08:00:00Z', custom: 'old' }]
    const newData = [{ id: 'Z', updatedAt: '2023-01-01T12:00:00Z', fresh: 'new' }]

    const result = mergeData(existingData, newData, { preserveOld: false })
    expect(result).toEqual([{ id: 'Z', updatedAt: '2023-01-01T12:00:00Z', fresh: 'new' }])
  })

  test('preserveOld: true - merges newer fields with extra UI props', () => {
    const existingData = [{ id: '1', updatedAt: '2023-01-01T10:00:00Z', hasBot: true }]
    const newData = [{ id: '1', updatedAt: '2023-01-01T12:00:00Z', platform: 'discord' }]

    const result = mergeData(existingData, newData, { preserveOld: true })
    expect(result).toEqual([
      { id: '1', updatedAt: '2023-01-01T12:00:00Z', hasBot: true, platform: 'discord' }
    ])
  })
})
