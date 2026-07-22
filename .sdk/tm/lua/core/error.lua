-- WeUltrarich SDK error

local WeUltrarichError = {}
WeUltrarichError.__index = WeUltrarichError


function WeUltrarichError.new(code, msg, ctx)
  local self = setmetatable({}, WeUltrarichError)
  self.is_sdk_error = true
  self.sdk = "WeUltrarich"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WeUltrarichError:error()
  return self.msg
end


function WeUltrarichError:__tostring()
  return self.msg
end


return WeUltrarichError
