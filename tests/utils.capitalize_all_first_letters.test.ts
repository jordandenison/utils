import { capitalizeAllFirstLetters } from '../src'

test('capitalizes first letter of each word', async () => {
  const result = capitalizeAllFirstLetters('hello world')

  expect(result).toBe('Hello World')
})

test('does not affect already capitalized letters', async () => {
  const result = capitalizeAllFirstLetters('Hello World')

  expect(result).toBe('Hello World')
})

test('handles single word input correctly', async () => {
  const result = capitalizeAllFirstLetters('hello')

  expect(result).toBe('Hello')
})

test('does not trim trailing whitespace', async () => {
  const result = capitalizeAllFirstLetters('hello  ')

  expect(result).toBe('Hello  ')
})

test('handles empty string input correctly', async () => {
  const result = capitalizeAllFirstLetters('')

  expect(result).toBe('')
})
