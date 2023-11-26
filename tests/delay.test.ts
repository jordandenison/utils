import { delay } from '../src'

describe('delay', () => {
  test('delays execution for specified time in milliseconds', async () => {
    const startTime = Date.now()
    await delay(500)
    const endTime = Date.now()

    expect(endTime - startTime).toBeGreaterThanOrEqual(490)
    expect(endTime - startTime).toBeLessThan(600)
  })

  test('can be used in a loop to create multiple delays', async () => {
    const startTime = Date.now()

    for (let i = 0; i < 3; i++) {
      await delay(100)
    }

    const endTime = Date.now()

    expect(endTime - startTime).toBeGreaterThanOrEqual(290)
    expect(endTime - startTime).toBeLessThan(400)
  })
})
