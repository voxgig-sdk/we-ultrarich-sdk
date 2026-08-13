// Typed models for the WeUltrarich SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Comparison {
  expression: string
  ratio: Record<string, any>
  resultTheirs: Record<string, any>
  resultYours: Record<string, any>
}

export interface ComparisonLoadMatch {
  expression?: string
  ratio?: Record<string, any>
  resultTheirs?: Record<string, any>
  resultYours?: Record<string, any>
}

export interface Discovery {
  route: string
}

export interface DiscoveryListMatch {
  route?: string
}

export interface WealthExpression {
  phrase: string
  scale: string
  sentence: string
  type: string
  unit: string
  value: number
}

export interface WealthExpressionLoadMatch {
  phrase?: string
  scale?: string
  sentence?: string
  type?: string
  unit?: string
  value?: number
}

