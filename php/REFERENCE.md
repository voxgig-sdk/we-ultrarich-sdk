# WeUltrarich PHP SDK Reference

Complete API reference for the WeUltrarich PHP SDK.


## WeUltrarichSDK

### Constructor

```php
require_once __DIR__ . '/weultrarich_sdk.php';

$client = new WeUltrarichSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WeUltrarichSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = WeUltrarichSDK::test();
```


### Instance Methods

#### `Comparison($data = null)`

Create a new `ComparisonEntity` instance. Pass `null` for no initial data.

#### `Discovery($data = null)`

Create a new `DiscoveryEntity` instance. Pass `null` for no initial data.

#### `WealthExpression($data = null)`

Create a new `WealthExpressionEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): WeUltrarichUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ComparisonEntity

```php
$comparison = $client->Comparison();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expression` | `string` | Yes | The expression that was computed for both wealths (echoed so the payload is self-describing). |
| `ratio` | `array` | Yes | The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger). |
| `resultTheirs` | `array` | Yes | The expression's result for wealthTheirs. |
| `resultYours` | `array` | Yes | The expression's result for wealthYours. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Comparison()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ComparisonEntity`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DiscoveryEntity

```php
$discovery = $client->Discovery();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `route` | `string` | Yes | The path to each available wealth expression. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Discovery()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DiscoveryEntity`

Create a new `DiscoveryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WealthExpressionEntity

```php
$wealth_expression = $client->WealthExpression();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `phrase` | `string` | Yes | A phrase of the growth of compounded interest (title-cased for use as a standalone label). |
| `scale` | `string` | Yes | A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose). |
| `sentence` | `string` | Yes | A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose). |
| `type` | `string` | Yes | This expression doesn't have any types. |
| `unit` | `string` | Yes | The unit for growth of compounded interest. |
| `value` | `float` | Yes | The value for growth of compounded interest. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WealthExpression()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WealthExpressionEntity`

Create a new `WealthExpressionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new WeUltrarichSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

