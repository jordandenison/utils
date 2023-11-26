import { isValidWebUrl } from '../src'

describe('isValidWebUrl', () => {
  test('returns true for a valid http URL', () => {
    const url = 'http://www.example.com'

    expect(isValidWebUrl(url)).toBe(true)
  })

  test('returns true for a valid https URL', () => {
    const url = 'https://www.example.com'

    expect(isValidWebUrl(url)).toBe(true)
  })

  test('returns true for a URL with a path', () => {
    const url = 'https://www.example.com/path/to/page'

    expect(isValidWebUrl(url)).toBe(true)
  })

  test('returns false for a URL without a top-level domain', () => {
    const url = 'https://example'

    expect(isValidWebUrl(url)).toBe(false)
  })

  test('returns false for a URL with spaces', () => {
    const url = 'https://www.exam ple.com'

    expect(isValidWebUrl(url)).toBe(false)
  })

  test('returns false for a string that is not a URL', () => {
    const url = 'not a url'

    expect(isValidWebUrl(url)).toBe(false)
  })

  test('returns false for an empty string', () => {
    const url = ''

    expect(isValidWebUrl(url)).toBe(false)
  })

  test('returns true for a URL with missing protocol', () => {
    const url = 'www.example.com'

    expect(isValidWebUrl(url)).toBe(true)
  })

  describe('requireProtocol option', () => {
    test('returns true for a URL with http protocol when requireProtocol is true', () => {
      const url = 'http://www.example.com'
      expect(isValidWebUrl(url, { requireProtocol: true })).toBe(true)
    })

    test('returns true for a URL with https protocol when requireProtocol is true', () => {
      const url = 'https://www.example.com'
      expect(isValidWebUrl(url, { requireProtocol: true })).toBe(true)
    })

    test('returns false for a URL without protocol when requireProtocol is true', () => {
      const url = 'www.example.com'
      expect(isValidWebUrl(url, { requireProtocol: true })).toBe(false)
    })

    test('returns true for a URL without protocol when requireProtocol is false', () => {
      const url = 'www.example.com'
      expect(isValidWebUrl(url, { requireProtocol: false })).toBe(true)
    })

    test('returns true for a URL without protocol when requireProtocol is not provided', () => {
      const url = 'www.example.com'
      expect(isValidWebUrl(url)).toBe(true)
    })

    test('returns false for a non-web URL when requireProtocol is true', () => {
      const url = 'ftp://www.example.com'
      expect(isValidWebUrl(url, { requireProtocol: true })).toBe(false)
    })

    test('returns false for a non-web URL when requireProtocol is false', () => {
      const url = 'ftp://www.example.com'
      expect(isValidWebUrl(url, { requireProtocol: false })).toBe(false)
    })
  })
})
