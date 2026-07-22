// Typed models for the WeUltrarich SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Comparison {
  data: Record<string, any>
  status: string
}

export interface ComparisonLoadMatch {
  data?: Record<string, any>
  status?: string
}

export interface Discovery {
  route: string
}

export interface DiscoveryListMatch {
  route?: string
}

export interface WealthExpression {
  data: Record<string, any>
  status: string
}

export interface WealthExpressionLoadMatch {
  data?: Record<string, any>
  status?: string
}

