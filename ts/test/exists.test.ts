
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WeUltrarichSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await WeUltrarichSDK.test()
    equal(null !== testsdk, true)
  })

})
