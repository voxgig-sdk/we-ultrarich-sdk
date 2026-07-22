# WeUltrarich SDK configuration


def make_config():
    return {
        "main": {
            "name": "WeUltrarich",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.wegtultrarich.org/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "comparison": {},
                "discovery": {},
                "wealth_expression": {},
            },
        },
        "entity": {
      "comparison": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "comparison",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "expression",
                      "orig": "expression",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "frequency",
                      "orig": "frequency",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 20,
                      "kind": "query",
                      "name": "period",
                      "orig": "period",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": 0.01,
                      "kind": "query",
                      "name": "rate",
                      "orig": "rate",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "spend",
                      "orig": "spend",
                      "reqd": False,
                      "type": "`$ANY`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "type_of_item",
                      "orig": "type_of_item",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "type_of_money",
                      "orig": "type_of_money",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "wealth_their",
                      "orig": "wealth_their",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "wealth_your",
                      "orig": "wealth_your",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/comparison",
                "parts": [
                  "comparison",
                ],
                "select": {
                  "exist": [
                    "expression",
                    "frequency",
                    "period",
                    "rate",
                    "spend",
                    "type_of_item",
                    "type_of_money",
                    "wealth_their",
                    "wealth_your",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "discovery": {
        "fields": [
          {
            "active": True,
            "name": "route",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
        ],
        "name": "discovery",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/expressions",
                "parts": [
                  "expressions",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "wealth_expression": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "wealth_expression",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "frequency",
                      "orig": "frequency",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 20,
                      "kind": "query",
                      "name": "period",
                      "orig": "period",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": 0.01,
                      "kind": "query",
                      "name": "rate",
                      "orig": "rate",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/growthOfCompoundInterest",
                "parts": [
                  "growthOfCompoundInterest",
                ],
                "select": {
                  "exist": [
                    "frequency",
                    "period",
                    "rate",
                    "wealth",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "spend",
                      "orig": "spend",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/durationOfDailySpend",
                "parts": [
                  "durationOfDailySpend",
                ],
                "select": {
                  "exist": [
                    "spend",
                    "wealth",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "type_of_item",
                      "orig": "type_of_item",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/numberOfItems",
                "parts": [
                  "numberOfItems",
                ],
                "select": {
                  "exist": [
                    "type_of_item",
                    "wealth",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 2,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "type_of_money",
                      "orig": "type_of_money",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/heightOfMoneyStack",
                "parts": [
                  "heightOfMoneyStack",
                ],
                "select": {
                  "exist": [
                    "type_of_money",
                    "wealth",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 3,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
