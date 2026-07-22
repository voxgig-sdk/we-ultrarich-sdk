<?php
declare(strict_types=1);

// Typed models for the WeUltrarich SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Comparison entity data model. */
class Comparison
{
    public array $data;
    public string $status;
}

/** Request payload for Comparison#load. */
class ComparisonLoadMatch
{
    public ?array $data = null;
    public ?string $status = null;
}

/** Discovery entity data model. */
class Discovery
{
    public string $route;
}

/** Request payload for Discovery#list. */
class DiscoveryListMatch
{
    public ?string $route = null;
}

/** WealthExpression entity data model. */
class WealthExpression
{
    public array $data;
    public string $status;
}

/** Request payload for WealthExpression#load. */
class WealthExpressionLoadMatch
{
    public ?array $data = null;
    public ?string $status = null;
}

