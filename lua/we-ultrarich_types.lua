-- Typed models for the WeUltrarich SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Comparison
---@field data table
---@field status string

---@class ComparisonLoadMatch
---@field data? table
---@field status? string

---@class Discovery
---@field route string

---@class DiscoveryListMatch
---@field route? string

---@class WealthExpression
---@field data table
---@field status string

---@class WealthExpressionLoadMatch
---@field data? table
---@field status? string

local M = {}

return M
