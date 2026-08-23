
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'WeUltrarich',
        slug: "we-ultrarich",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.wegtultrarich.org/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      comparison: {
      },

      discovery: {
      },

      wealth_expression: {
      },

    }
  }


  entity = {
    "comparison": {
      "fields": [
        {
          "name": "expression",
          "req": true,
          "short": "The expression that was computed for both wealths (echoed so the payload is self-describing).",
          "type": "`$STRING`"
        },
        {
          "name": "ratio",
          "req": true,
          "short": "The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger).",
          "type": "`$OBJECT`"
        },
        {
          "name": "resultTheirs",
          "req": true,
          "short": "The expression's result for wealthTheirs.",
          "type": "`$OBJECT`"
        },
        {
          "name": "resultYours",
          "req": true,
          "short": "The expression's result for wealthYours.",
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "frequency",
                    "orig": "frequency",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "period",
                    "orig": "period",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 0.01,
                    "kind": "query",
                    "name": "rate",
                    "orig": "rate",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "spend",
                    "orig": "spend",
                    "type": "`$ANY`"
                  },
                  {
                    "kind": "query",
                    "name": "type_of_item",
                    "orig": "type_of_item",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "type_of_money",
                    "orig": "type_of_money",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "wealth_their",
                    "orig": "wealth_their",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "kind": "query",
                    "name": "wealth_your",
                    "orig": "wealth_your",
                    "reqd": true,
                    "type": "`$ANY`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/comparison",
              "parts": [
                "comparison"
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
                  "wealth_your"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "discovery": {
      "fields": [
        {
          "name": "route",
          "req": true,
          "short": "The path to each available wealth expression.",
          "type": "`$STRING`"
        }
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
              "parts": [
                "expressions"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "wealth_expression": {
      "fields": [
        {
          "name": "phrase",
          "req": true,
          "short": "A phrase of the growth of compounded interest (title-cased for use as a standalone label).",
          "type": "`$STRING`"
        },
        {
          "name": "scale",
          "req": true,
          "short": "A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose).",
          "type": "`$STRING`"
        },
        {
          "name": "sentence",
          "req": true,
          "short": "A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose).",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "short": "This expression doesn't have any types.",
          "type": "`$STRING`"
        },
        {
          "name": "unit",
          "req": true,
          "short": "The unit for growth of compounded interest.",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "req": true,
          "short": "The value for growth of compounded interest.",
          "type": "`$NUMBER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "period",
                    "orig": "period",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 0.01,
                    "kind": "query",
                    "name": "rate",
                    "orig": "rate",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "wealth",
                    "orig": "wealth",
                    "reqd": true,
                    "type": "`$ANY`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/growthOfCompoundInterest",
              "parts": [
                "growthOfCompoundInterest"
              ],
              "select": {
                "exist": [
                  "frequency",
                  "period",
                  "rate",
                  "wealth"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "spend",
                    "orig": "spend",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "kind": "query",
                    "name": "wealth",
                    "orig": "wealth",
                    "reqd": true,
                    "type": "`$ANY`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/durationOfDailySpend",
              "parts": [
                "durationOfDailySpend"
              ],
              "select": {
                "exist": [
                  "spend",
                  "wealth"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "type_of_item",
                    "orig": "type_of_item",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "wealth",
                    "orig": "wealth",
                    "reqd": true,
                    "type": "`$ANY`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/numberOfItems",
              "parts": [
                "numberOfItems"
              ],
              "select": {
                "exist": [
                  "type_of_item",
                  "wealth"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "type_of_money",
                    "orig": "type_of_money",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "wealth",
                    "orig": "wealth",
                    "reqd": true,
                    "type": "`$ANY`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/heightOfMoneyStack",
              "parts": [
                "heightOfMoneyStack"
              ],
              "select": {
                "exist": [
                  "type_of_money",
                  "wealth"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

