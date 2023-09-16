import { removeData } from '../src'

const obj1 = { id: '1', updatedAt: '2023-01-01T10:00:00Z' }
const obj1WithNewDate = { id: '1', updatedAt: '2023-01-01T13:00:00Z' }
const obj2 = { id: '2', updatedAt: '2023-01-01T11:00:00Z' }
const obj2WithNewDate = { id: '2', updatedAt: '2023-01-01T13:00:00Z' }
const obj3 = { id: '3', updatedAt: '2023-01-01T12:00:00Z' }
const obj3WithNewDate = { id: '3', updatedAt: '2023-01-01T14:00:00Z' }
const obj4 = { id: 4, updatedAt: '2023-01-01T10:00:00Z' }
const obj4WithNewDate = { id: 4, updatedAt: '2023-01-01T13:00:00Z' }
const obj5 = { id: 5, updatedAt: '2023-01-01T11:00:00Z' }
const obj6 = { id: 6, updatedAt: '2023-01-01T12:00:00Z' }

test('removes a single item with number ID with the same updatedAt time', () => {
  const existingData = [obj4, obj5]
  const newData = obj4

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj5])
})

test('removes a single item with number ID with a different updatedAt time', () => {
  const existingData = [obj4, obj5]
  const newData = obj4WithNewDate

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj5])
})

test('removes multiple items with number IDs', () => {
  const existingData = [obj4, obj5]
  const newData = [obj4WithNewDate, obj5]

  const result = removeData(existingData, newData)

  expect(result).toEqual([])
})

test('does not remove any items with number IDs if newData is not found in the existing data', () => {
  const existingData = [obj4, obj5]
  const newData = obj6

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj4, obj5])
})

test('handles removal correctly with mixed types of IDs', () => {
  const existingData = [obj1, obj4]
  const newData = [obj1WithNewDate, obj4WithNewDate]

  const result = removeData(existingData, newData)

  expect(result).toEqual([])
})

test('removes a single item', () => {
  const existingData = [obj1, obj2, obj3]
  const newData = obj2

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj1, obj3])
})

test('removes a single item with a new date', () => {
  const existingData = [obj1, obj2, obj3]
  const newData = obj2WithNewDate

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj1, obj3])
})

test('removes multiple items', () => {
  const existingData = [obj1, obj2, obj3]
  const newData = [obj1WithNewDate, obj3WithNewDate]

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj2])
})

test('returns an empty array if all items are removed', () => {
  const existingData = [obj1, obj2]
  const newData = [obj1WithNewDate, obj2WithNewDate]

  const result = removeData(existingData, newData)

  expect(result).toEqual([])
})
