# WeUltrarich Ruby SDK Reference

Complete API reference for the WeUltrarich Ruby SDK.


## WeUltrarichSDK

### Constructor

```ruby
require_relative 'WeUltrarich_sdk'

client = WeUltrarichSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WeUltrarichSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = WeUltrarichSDK.test
```


### Instance Methods

#### `Comparison(data = nil)`

Create a new `Comparison` entity instance. Pass `nil` for no initial data.

#### `Discovery(data = nil)`

Create a new `Discovery` entity instance. Pass `nil` for no initial data.

#### `WealthExpression(data = nil)`

Create a new `WealthExpression` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ComparisonEntity

```ruby
comparison = client.Comparison
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expression` | `String` | Yes | The expression that was computed for both wealths (echoed so the payload is self-describing). |
| `ratio` | `Hash` | Yes | The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger). |
| `resultTheirs` | `Hash` | Yes | The expression's result for wealthTheirs. |
| `resultYours` | `Hash` | Yes | The expression's result for wealthYours. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Comparison.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DiscoveryEntity

```ruby
discovery = client.Discovery
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `route` | `String` | Yes | The path to each available wealth expression. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Discovery.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DiscoveryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WealthExpressionEntity

```ruby
wealth_expression = client.WealthExpression
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `phrase` | `String` | Yes | A phrase of the growth of compounded interest (title-cased for use as a standalone label). |
| `scale` | `String` | Yes | A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose). |
| `sentence` | `String` | Yes | A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose). |
| `type` | `String` | Yes | This expression doesn't have any types. |
| `unit` | `String` | Yes | The unit for growth of compounded interest. |
| `value` | `Float` | Yes | The value for growth of compounded interest. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WealthExpression.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WealthExpressionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = WeUltrarichSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

