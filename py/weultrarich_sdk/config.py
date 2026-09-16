# WeUltrarich SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "WeUltrarich",
            "slug": "we-ultrarich",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "expression",
            "req": True,
            "short": "The expression that was computed for both wealths (echoed so the payload is self-describing).",
            "type": "`$STRING`",
          },
          {
            "name": "ratio",
            "req": True,
            "short": "The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger).",
            "type": "`$OBJECT`",
          },
          {
            "name": "resultTheirs",
            "req": True,
            "short": "The expression's result for wealthTheirs.",
            "type": "`$OBJECT`",
          },
          {
            "name": "resultYours",
            "req": True,
            "short": "The expression's result for wealthYours.",
            "type": "`$OBJECT`",
          },
        ],
        "name": "comparison",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "expression",
                      "orig": "expression",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "frequency",
                      "orig": "frequency",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "period",
                      "orig": "period",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 0.01,
                      "kind": "query",
                      "name": "rate",
                      "orig": "rate",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "spend",
                      "orig": "spend",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "type_of_item",
                      "orig": "type_of_item",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "type_of_money",
                      "orig": "type_of_money",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "wealth_their",
                      "orig": "wealth_their",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "wealth_your",
                      "orig": "wealth_your",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/comparison",
                "segments": [
                  {
                    "lit": "comparison",
                  },
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
                  "res": "`body.data`",
                },
                "parts": [
                  "comparison",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "discovery": {
        "fields": [
          {
            "name": "route",
            "req": True,
            "short": "The path to each available wealth expression.",
            "type": "`$STRING`",
          },
        ],
        "name": "discovery",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/expressions",
                "segments": [
                  {
                    "lit": "expressions",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "expressions",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "wealth_expression": {
        "fields": [
          {
            "name": "phrase",
            "req": True,
            "short": "A phrase of the growth of compounded interest (title-cased for use as a standalone label).",
            "type": "`$STRING`",
          },
          {
            "name": "scale",
            "req": True,
            "short": "A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose).",
            "type": "`$STRING`",
          },
          {
            "name": "sentence",
            "req": True,
            "short": "A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose).",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "short": "This expression doesn't have any types.",
            "type": "`$STRING`",
          },
          {
            "name": "unit",
            "req": True,
            "short": "The unit for growth of compounded interest.",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "req": True,
            "short": "The value for growth of compounded interest.",
            "type": "`$NUMBER`",
          },
        ],
        "name": "wealth_expression",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "frequency",
                      "orig": "frequency",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "period",
                      "orig": "period",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 0.01,
                      "kind": "query",
                      "name": "rate",
                      "orig": "rate",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/growthOfCompoundInterest",
                "segments": [
                  {
                    "lit": "growthOfCompoundInterest",
                  },
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
                  "res": "`body.data`",
                },
                "parts": [
                  "growthOfCompoundInterest",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "spend",
                      "orig": "spend",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/durationOfDailySpend",
                "segments": [
                  {
                    "lit": "durationOfDailySpend",
                  },
                ],
                "select": {
                  "exist": [
                    "spend",
                    "wealth",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "durationOfDailySpend",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "type_of_item",
                      "orig": "type_of_item",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/numberOfItems",
                "segments": [
                  {
                    "lit": "numberOfItems",
                  },
                ],
                "select": {
                  "exist": [
                    "type_of_item",
                    "wealth",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "numberOfItems",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "type_of_money",
                      "orig": "type_of_money",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "wealth",
                      "orig": "wealth",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/heightOfMoneyStack",
                "segments": [
                  {
                    "lit": "heightOfMoneyStack",
                  },
                ],
                "select": {
                  "exist": [
                    "type_of_money",
                    "wealth",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "heightOfMoneyStack",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
