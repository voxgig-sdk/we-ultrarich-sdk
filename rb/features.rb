# WeUltrarich SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WeUltrarichFeatures
  def self.make_feature(name)
    case name
    when "base"
      WeUltrarichBaseFeature.new
    when "ratelimit"
      WeUltrarichRatelimitFeature.new
    when "retry"
      WeUltrarichRetryFeature.new
    when "test"
      WeUltrarichTestFeature.new
    when "timeout"
      WeUltrarichTimeoutFeature.new
    else
      WeUltrarichBaseFeature.new
    end
  end
end
