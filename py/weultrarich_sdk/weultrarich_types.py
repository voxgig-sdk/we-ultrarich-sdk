# Typed models for the WeUltrarich SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Comparison(TypedDict):
    expression: str
    ratio: dict
    resultTheirs: dict
    resultYours: dict


class ComparisonLoadMatchRequired(TypedDict):
    expression: str
    wealth_their: Any
    wealth_your: Any


class ComparisonLoadMatch(ComparisonLoadMatchRequired, total=False):
    frequency: str
    period: float
    rate: float
    spend: Any
    type_of_item: str
    type_of_money: str


class Discovery(TypedDict):
    route: str


class DiscoveryListMatch(TypedDict, total=False):
    route: str


class WealthExpression(TypedDict):
    phrase: str
    scale: str
    sentence: str
    type: str
    unit: str
    value: float


class WealthExpressionLoadMatchRequired(TypedDict):
    wealth: Any


class WealthExpressionLoadMatch(WealthExpressionLoadMatchRequired, total=False):
    frequency: str
    period: float
    rate: float
    spend: Any
    type_of_item: str
    type_of_money: str
