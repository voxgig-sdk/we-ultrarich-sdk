# WeUltrarich TypeScript SDK Reference

Complete API reference for the WeUltrarich TypeScript SDK.


## WeUltrarichSDK

### Constructor

```ts
new WeUltrarichSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WeUltrarichSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = WeUltrarichSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `WeUltrarichSDK` instance in test mode.


### Instance Methods

#### `Comparison(data?: object)`

Create a new `Comparison` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ComparisonEntity` instance.

#### `Discovery(data?: object)`

Create a new `Discovery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DiscoveryEntity` instance.

#### `WealthExpression(data?: object)`

Create a new `WealthExpression` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WealthExpressionEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `WeUltrarichSDK.test()`.

**Returns:** `WeUltrarichSDK` instance in test mode.


---

## ComparisonEntity

```ts
const comparison = client.Comparison()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expression` | `string` | Yes | The expression that was computed for both wealths (echoed so the payload is self-describing). |
| `ratio` | `Record<string, any>` | Yes | The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger). |
| `resultTheirs` | `Record<string, any>` | Yes | The expression's result for wealthTheirs. |
| `resultYours` | `Record<string, any>` | Yes | The expression's result for wealthYours. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Comparison().load({ expression: 'expression', wealth_their: 'wealth_their', wealth_your: 'wealth_your' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `client()`

Return the parent `WeUltrarichSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DiscoveryEntity

```ts
const discovery = client.Discovery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `route` | `string` | Yes | The path to each available wealth expression. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Discovery().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DiscoveryEntity` instance with the same client and
options.

#### `client()`

Return the parent `WeUltrarichSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WealthExpressionEntity

```ts
const wealth_expression = client.WealthExpression()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `phrase` | `string` | Yes | A phrase of the growth of compounded interest (title-cased for use as a standalone label). |
| `scale` | `string` | Yes | A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose). |
| `sentence` | `string` | Yes | A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose). |
| `type` | `string` | Yes | This expression doesn't have any types. |
| `unit` | `string` | Yes | The unit for growth of compounded interest. |
| `value` | `number` | Yes | The value for growth of compounded interest. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WealthExpression().load({ wealth: 'wealth' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WealthExpressionEntity` instance with the same client and
options.

#### `client()`

Return the parent `WeUltrarichSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new WeUltrarichSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

