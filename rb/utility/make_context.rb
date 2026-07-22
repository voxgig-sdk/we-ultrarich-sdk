# WeUltrarich SDK utility: make_context
require_relative '../core/context'
module WeUltrarichUtilities
  MakeContext = ->(ctxmap, basectx) {
    WeUltrarichContext.new(ctxmap, basectx)
  }
end
