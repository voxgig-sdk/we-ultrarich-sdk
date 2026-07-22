# WeUltrarich SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WeUltrarichUtility.registrar = ->(u) {
  u.clean = WeUltrarichUtilities::Clean
  u.done = WeUltrarichUtilities::Done
  u.make_error = WeUltrarichUtilities::MakeError
  u.feature_add = WeUltrarichUtilities::FeatureAdd
  u.feature_hook = WeUltrarichUtilities::FeatureHook
  u.feature_init = WeUltrarichUtilities::FeatureInit
  u.fetcher = WeUltrarichUtilities::Fetcher
  u.make_fetch_def = WeUltrarichUtilities::MakeFetchDef
  u.make_context = WeUltrarichUtilities::MakeContext
  u.make_options = WeUltrarichUtilities::MakeOptions
  u.make_request = WeUltrarichUtilities::MakeRequest
  u.make_response = WeUltrarichUtilities::MakeResponse
  u.make_result = WeUltrarichUtilities::MakeResult
  u.make_point = WeUltrarichUtilities::MakePoint
  u.make_spec = WeUltrarichUtilities::MakeSpec
  u.make_url = WeUltrarichUtilities::MakeUrl
  u.param = WeUltrarichUtilities::Param
  u.prepare_auth = WeUltrarichUtilities::PrepareAuth
  u.prepare_body = WeUltrarichUtilities::PrepareBody
  u.prepare_headers = WeUltrarichUtilities::PrepareHeaders
  u.prepare_method = WeUltrarichUtilities::PrepareMethod
  u.prepare_params = WeUltrarichUtilities::PrepareParams
  u.prepare_path = WeUltrarichUtilities::PreparePath
  u.prepare_query = WeUltrarichUtilities::PrepareQuery
  u.result_basic = WeUltrarichUtilities::ResultBasic
  u.result_body = WeUltrarichUtilities::ResultBody
  u.result_headers = WeUltrarichUtilities::ResultHeaders
  u.transform_request = WeUltrarichUtilities::TransformRequest
  u.transform_response = WeUltrarichUtilities::TransformResponse
}
