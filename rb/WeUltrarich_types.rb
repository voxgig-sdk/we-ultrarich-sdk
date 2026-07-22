# frozen_string_literal: true

# Typed models for the WeUltrarich SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Comparison entity data model.
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
Comparison = Struct.new(
  :data,
  :status,
  keyword_init: true
)

# Request payload for Comparison#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ComparisonLoadMatch = Struct.new(
  :data,
  :status,
  keyword_init: true
)

# Discovery entity data model.
#
# @!attribute [rw] route
#   @return [String]
Discovery = Struct.new(
  :route,
  keyword_init: true
)

# Request payload for Discovery#list.
#
# @!attribute [rw] route
#   @return [String, nil]
DiscoveryListMatch = Struct.new(
  :route,
  keyword_init: true
)

# WealthExpression entity data model.
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
WealthExpression = Struct.new(
  :data,
  :status,
  keyword_init: true
)

# Request payload for WealthExpression#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
WealthExpressionLoadMatch = Struct.new(
  :data,
  :status,
  keyword_init: true
)

