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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
								"parts": []any{
									"comparison",
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
								"parts": []any{
									"expressions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"growthOfCompoundInterest",
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
								"parts": []any{
									"durationOfDailySpend",
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
								"parts": []any{
									"numberOfItems",
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
								"parts": []any{
									"heightOfMoneyStack",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
