
import { Context } from './Context'


class WeUltrarichError extends Error {

  isWeUltrarichError = true

  sdk = 'WeUltrarich'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  WeUltrarichError
}

