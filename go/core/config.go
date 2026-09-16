package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WeUltrarich",
			"slug": "we-ultrarich",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.wegtultrarich.org/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"comparison": map[string]any{},
				"discovery": map[string]any{},
				"wealth_expression": map[string]any{},
			},
		},
		"entity": map[string]any{
			"comparison": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "expression",
						"req": true,
						"short": "The expression that was computed for both wealths (echoed so the payload is self-describing).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ratio",
						"req": true,
						"short": "The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger).",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "resultTheirs",
						"req": true,
						"short": "The expression's result for wealthTheirs.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "resultYours",
						"req": true,
						"short": "The expression's result for wealthYours.",
						"type": "`$OBJECT`",
					},
				},
				"name": "comparison",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "expression",
											"orig": "expression",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "frequency",
											"orig": "frequency",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "period",
											"orig": "period",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 0.01,
											"kind": "query",
											"name": "rate",
											"orig": "rate",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "spend",
											"orig": "spend",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "type_of_item",
											"orig": "type_of_item",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type_of_money",
											"orig": "type_of_money",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "wealth_their",
											"orig": "wealth_their",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "wealth_your",
											"orig": "wealth_your",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/comparison",
								"segments": []any{
									map[string]any{
										"lit": "comparison",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"expression",
										"frequency",
										"period",
										"rate",
										"spend",
										"type_of_item",
										"type_of_money",
										"wealth_their",
										"wealth_your",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"comparison",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"discovery": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "route",
						"req": true,
						"short": "The path to each available wealth expression.",
						"type": "`$STRING`",
					},
				},
				"name": "discovery",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/expressions",
								"segments": []any{
									map[string]any{
										"lit": "expressions",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"expressions",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"wealth_expression": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "phrase",
						"req": true,
						"short": "A phrase of the growth of compounded interest (title-cased for use as a standalone label).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scale",
						"req": true,
						"short": "A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sentence",
						"req": true,
						"short": "A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "This expression doesn't have any types.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unit",
						"req": true,
						"short": "The unit for growth of compounded interest.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"req": true,
						"short": "The value for growth of compounded interest.",
						"type": "`$NUMBER`",
					},
				},
				"name": "wealth_expression",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "frequency",
											"orig": "frequency",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "period",
											"orig": "period",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 0.01,
											"kind": "query",
											"name": "rate",
											"orig": "rate",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/growthOfCompoundInterest",
								"segments": []any{
									map[string]any{
										"lit": "growthOfCompoundInterest",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"frequency",
										"period",
										"rate",
										"wealth",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"growthOfCompoundInterest",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "spend",
											"orig": "spend",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/durationOfDailySpend",
								"segments": []any{
									map[string]any{
										"lit": "durationOfDailySpend",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"spend",
										"wealth",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"durationOfDailySpend",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "type_of_item",
											"orig": "type_of_item",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/numberOfItems",
								"segments": []any{
									map[string]any{
										"lit": "numberOfItems",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"type_of_item",
										"wealth",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"numberOfItems",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "type_of_money",
											"orig": "type_of_money",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/heightOfMoneyStack",
								"segments": []any{
									map[string]any{
										"lit": "heightOfMoneyStack",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"type_of_money",
										"wealth",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"heightOfMoneyStack",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
