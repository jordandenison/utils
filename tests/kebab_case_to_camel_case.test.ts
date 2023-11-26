import { kebabCaseToCamelCase } from '../src'

describe('kebabCaseToCamelCase', () => {
  test('converts kebab-case to camelCase', async () => {
    const result = kebabCaseToCamelCase('hello-world')

    expect(result).toBe('helloWorld')
  })

  test('converts multiple kebab-case elements to camelCase', async () => {
    const result = kebabCaseToCamelCase('foo-bar-baz-qux')

    expect(result).toBe('fooBarBazQux')
  })

  test('does not change strings without hyphens', async () => {
    const result = kebabCaseToCamelCase('hello')

    expect(result).toBe('hello')
  })

  test('handles empty strings correctly', async () => {
    const result = kebabCaseToCamelCase('')

    expect(result).toBe('')
  })
})
