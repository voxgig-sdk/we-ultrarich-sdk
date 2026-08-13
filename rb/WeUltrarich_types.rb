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
# @!attribute [rw] expression
#   @return [String]
#
# @!attribute [rw] ratio
#   @return [Hash]
#
# @!attribute [rw] resultTheirs
#   @return [Hash]
#
# @!attribute [rw] resultYours
#   @return [Hash]
Comparison = Struct.new(
  :expression,
  :ratio,
  :resultTheirs,
  :resultYours,
  keyword_init: true
)

# Request payload for Comparison#load.
#
# @!attribute [rw] expression
#   @return [String, nil]
#
# @!attribute [rw] ratio
#   @return [Hash, nil]
#
# @!attribute [rw] resultTheirs
#   @return [Hash, nil]
#
# @!attribute [rw] resultYours
#   @return [Hash, nil]
ComparisonLoadMatch = Struct.new(
  :expression,
  :ratio,
  :resultTheirs,
  :resultYours,
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
# @!attribute [rw] phrase
#   @return [String]
#
# @!attribute [rw] scale
#   @return [String]
#
# @!attribute [rw] sentence
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] unit
#   @return [String]
#
# @!attribute [rw] value
#   @return [Float]
WealthExpression = Struct.new(
  :phrase,
  :scale,
  :sentence,
  :type,
  :unit,
  :value,
  keyword_init: true
)

# Request payload for WealthExpression#load.
#
# @!attribute [rw] phrase
#   @return [String, nil]
#
# @!attribute [rw] scale
#   @return [String, nil]
#
# @!attribute [rw] sentence
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Float, nil]
WealthExpressionLoadMatch = Struct.new(
  :phrase,
  :scale,
  :sentence,
  :type,
  :unit,
  :value,
  keyword_init: true
)

