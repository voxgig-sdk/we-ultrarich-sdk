# WeUltrarich SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module WeUltrarichFeatures
  def self.make_feature(name)
    case name
    when "base"
      WeUltrarichBaseFeature.new
    when "test"
      WeUltrarichTestFeature.new
    else
      WeUltrarichBaseFeature.new
    end
  end
end
