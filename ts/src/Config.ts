
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


  main = {
    name: 'WeUltrarich',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.wegtultrarich.org/v1',

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
          "active": true,
          "name": "expression",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "ratio",
          "req": true,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "resultTheirs",
          "req": true,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "resultYours",
          "req": true,
          "type": "`$OBJECT`",
          "index$": 3
        }
      ],
      "name": "comparison",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "expression",
                    "orig": "expression",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "frequency",
                    "orig": "frequency",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "period",
                    "orig": "period",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "example": 0.01,
                    "kind": "query",
                    "name": "rate",
                    "orig": "rate",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "spend",
                    "orig": "spend",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "type_of_item",
                    "orig": "type_of_item",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "type_of_money",
                    "orig": "type_of_money",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "wealth_their",
                    "orig": "wealth_their",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "discovery": {
      "fields": [
        {
          "active": true,
          "name": "route",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        }
      ],
      "name": "discovery",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "wealth_expression": {
      "fields": [
        {
          "active": true,
          "name": "phrase",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "scale",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "sentence",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "type",
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "unit",
          "req": true,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "value",
          "req": true,
          "type": "`$NUMBER`",
          "index$": 5
        }
      ],
      "name": "wealth_expression",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "frequency",
                    "orig": "frequency",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "period",
                    "orig": "period",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "example": 0.01,
                    "kind": "query",
                    "name": "rate",
                    "orig": "rate",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "spend",
                    "orig": "spend",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
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
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "type_of_item",
                    "orig": "type_of_item",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
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
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "type_of_money",
                    "orig": "type_of_money",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
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
              },
              "index$": 3
            }
          ],
          "key$": "load"
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

