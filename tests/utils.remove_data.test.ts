import { removeData } from '../src'

const obj1 = { id: '1', updatedAt: '2023-01-01T10:00:00Z' }
const obj2 = { id: '2', updatedAt: '2023-01-01T11:00:00Z' }
const obj3 = { id: '3', updatedAt: '2023-01-01T12:00:00Z' }
const newDateObj1 = { id: '1', updatedAt: '2023-01-01T13:00:00Z' }
const newDateObj2 = { id: '2', updatedAt: '2023-01-01T13:00:00Z' }
const newDateObj3 = { id: '3', updatedAt: '2023-01-01T14:00:00Z' }

test('should remove a single item from the existingData array', () => {
  const existingData = [obj1, obj2, obj3]
  const newData = { id: '2', updatedAt: '2023-01-01T13:00:00Z' }

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj1, obj3])
})

test('should remove multiple items from the existingData array', () => {
  const existingData = [obj1, obj2, obj3]
  const newData = [newDateObj1, newDateObj3]

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj2])
})

test('should not remove any items if newData is not found in existingData', () => {
  const existingData = [obj1, obj2]
  const newData = { id: '3', updatedAt: '2023-01-01T12:00:00Z' }

  const result = removeData(existingData, newData)

  expect(result).toEqual([obj1, obj2])
})

test('should return an empty array if all items are removed', () => {
  const existingData = [obj1, obj2]
  const newData = [newDateObj1, newDateObj2]

  const result = removeData(existingData, newData)

  expect(result).toEqual([])
})
