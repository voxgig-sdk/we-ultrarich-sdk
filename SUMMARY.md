# We &gt; Ultrarich API

How much is billions or trillions of dollars? Understand the scale of extreme wealth inequality by viewing Duration Of Daily Spend (Daily Spending), Height Of Stacked Money (Physical Size), Number Of Items Paid For (Purchasing Power), or Growth Of Compound Interest (Compound Interest). An MCP (Model Context Protocol) server exposing these operations as agent tools is available at https://api.wegtultrarich.org/mcp. Free for any use, including commercial. Results are licensed CC BY 4.0, please use the attribution &quot;Source: We &gt; Ultrarich (wegtultrarich.org).&quot; The API&#39;s source code is not open source; view [LICENSE.md](https://wegtultrarich.org/LICENSE.md).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 3 entities and 6 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Comparison

Results: a JSON object with response data.

SDK operations: `load`.

Key fields to recognise:

- `expression`: The expression that was computed for both wealths (echoed so the payload is self-describing).
- `ratio`: The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger).
- `resultTheirs`: The expression&#39;s result for wealthTheirs. Same shape as the expression&#39;s own endpoint response data.
- `resultYours`: The expression&#39;s result for wealthYours. Same shape as the expression&#39;s own endpoint response data.

### Discovery

Results: a JSON object with response data.

SDK operations: `list`.

Key fields to recognise:

- `route`: The path to each available wealth expression.

### WealthExpression

Results: a JSON object with response data.

SDK operations: `load`.

Key fields to recognise:

- `phrase`: A phrase of the growth of compounded interest (title-cased for use as a standalone label).
- `scale`: A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose).
- `sentence`: A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose).
- `type`: This expression doesn&#39;t have any types.
- `unit`: The unit for growth of compounded interest.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Comparison | `load` | `GET /comparison` | Not required |
| Discovery | `list` | `GET /expressions` | Not required |
| WealthExpression | `load` | `GET /growthOfCompoundInterest` | Not required |
| WealthExpression | `load` | `GET /durationOfDailySpend` | Not required |
| WealthExpression | `load` | `GET /numberOfItems` | Not required |
| WealthExpression | `load` | `GET /heightOfMoneyStack` | Not required |

## Connect to the API

- Main (Production) Server: `https://api.wegtultrarich.org/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /expressions`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.wegtultrarich.org/v1/expressions'
```

Inspect the response using the Discovery reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `we-ultrarich_list`: List records for an entity. Supported entities: `discovery`.
- `we-ultrarich_load`: Load one record for an entity. Supported entities: `comparison`, `wealth_expression`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

