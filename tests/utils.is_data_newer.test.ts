import { isDataNewer } from '../src'

test('returns true when existingData does not have updatedAt property', () => {
  const existingData = { id: '1' }
  const newData = { id: '2', updatedAt: '2023-01-01T12:00:00Z' }

  const result = isDataNewer(existingData, newData)

  expect(result).toBe(true)
})

test('returns true when newData does not have updatedAt property', () => {
  const existingData = { id: '1', updatedAt: '2023-01-01T12:00:00Z' }
  const newData = { id: '2' }

  const result = isDataNewer(existingData, newData)

  expect(result).toBe(true)
})

test('returns true when newData has a more recent updatedAt than existingData', () => {
  const existingData = { id: '1', updatedAt: '2023-01-01T10:00:00Z' }
  const newData = { id: '2', updatedAt: '2023-01-01T12:00:00Z' }

  const result = isDataNewer(existingData, newData)

  expect(result).toBe(true)
})

test('returns false when newData has an older updatedAt than existingData', () => {
  const existingData = { id: '1', updatedAt: '2023-01-01T12:00:00Z' }
  const newData = { id: '2', updatedAt: '2023-01-01T10:00:00Z' }

  const result = isDataNewer(existingData, newData)

  expect(result).toBe(false)
})

test('throws an error when updatedAt of newData is not a valid date', () => {
  const existingData = { id: '1', updatedAt: '2023-01-01T12:00:00Z' }
  const newData = { id: '2', updatedAt: 'not-a-date' }

  expect(() => isDataNewer(existingData, newData)).toThrowError('"not-a-date" is not a valid date')
})

test('throws an error when updatedAt of existingData is not a valid date', () => {
  const existingData = { id: '1', updatedAt: 'not-a-date' }
  const newData = { id: '2', updatedAt: '2023-01-01T12:00:00Z' }

  expect(() => isDataNewer(existingData, newData)).toThrowError('"not-a-date" is not a valid date')
})
