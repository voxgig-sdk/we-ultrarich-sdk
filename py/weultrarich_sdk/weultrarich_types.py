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


class ComparisonLoadMatch(TypedDict, total=False):
    expression: str
    ratio: dict
    resultTheirs: dict
    resultYours: dict


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


class WealthExpressionLoadMatch(TypedDict, total=False):
    phrase: str
    scale: str
    sentence: str
    type: str
    unit: str
    value: float
