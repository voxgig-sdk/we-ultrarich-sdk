package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WeUltrarich",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"active": true,
						"name": "data",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "comparison",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "expression",
											"orig": "expression",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "frequency",
											"orig": "frequency",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 20,
											"kind": "query",
											"name": "period",
											"orig": "period",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 0.01,
											"kind": "query",
											"name": "rate",
											"orig": "rate",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "spend",
											"orig": "spend",
											"reqd": false,
											"type": "`$ANY`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "type_of_item",
											"orig": "type_of_item",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "type_of_money",
											"orig": "type_of_money",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "wealth_their",
											"orig": "wealth_their",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "wealth_your",
											"orig": "wealth_your",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"discovery": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "route",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
				},
				"name": "discovery",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "GET",
								"orig": "/expressions",
								"parts": []any{
									"expressions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"wealth_expression": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "data",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "wealth_expression",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "frequency",
											"orig": "frequency",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 20,
											"kind": "query",
											"name": "period",
											"orig": "period",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 0.01,
											"kind": "query",
											"name": "rate",
											"orig": "rate",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "spend",
											"orig": "spend",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "type_of_item",
											"orig": "type_of_item",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 2,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "type_of_money",
											"orig": "type_of_money",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "wealth",
											"orig": "wealth",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 3,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
