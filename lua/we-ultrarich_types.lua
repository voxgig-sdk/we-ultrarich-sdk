-- Typed models for the WeUltrarich SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Comparison
---@field expression string
---@field ratio table
---@field resultTheirs table
---@field resultYours table

---@class ComparisonLoadMatch
---@field expression string
---@field frequency? string
---@field period? number
---@field rate? number
---@field spend? any
---@field type_of_item? string
---@field type_of_money? string
---@field wealth_their any
---@field wealth_your any

---@class Discovery
---@field route string

---@class DiscoveryListMatch
---@field route? string

---@class WealthExpression
---@field phrase string
---@field scale string
---@field sentence string
---@field type string
---@field unit string
---@field value number

---@class WealthExpressionLoadMatch
---@field frequency? string
---@field period? number
---@field rate? number
---@field wealth any
---@field spend? any
---@field type_of_item? string
---@field type_of_money? string

local M = {}

return M
