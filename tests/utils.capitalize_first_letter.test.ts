import { capitalizeFirstLetter } from '../src'

test('capitalizes first letter', async () => {
  const result = capitalizeFirstLetter('hello')
  expect(result).toBe('Hello')
})

test('capitalizes only the first letter', async () => {
  const result = capitalizeFirstLetter('hello world')
  expect(result).toBe('Hello world')
})

test('handles empty string without error', async () => {
  const result = capitalizeFirstLetter('')
  expect(result).toBe('')
})

test('ignores leading whitespace when capitalizing', async () => {
  const result = capitalizeFirstLetter(' hello')
  expect(result).toBe(' hello')
})

test('does not alter string that already starts with a capital letter', async () => {
  const result = capitalizeFirstLetter('Hello')
  expect(result).toBe('Hello')
})
