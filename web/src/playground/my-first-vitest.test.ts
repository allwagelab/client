import { test, expect } from 'vitest'

test('1 - 1 = 0', () => {
  const expected = 0

  const result = 1 - 1

  expect(result).toEqual(expected)
})
