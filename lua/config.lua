-- WeUltrarich SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "WeUltrarich",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.wegtultrarich.org/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["comparison"] = {},
        ["discovery"] = {},
        ["wealth_expression"] = {},
      },
    },
    entity = {
      ["comparison"] = {
        ["fields"] = {
          {
            ["name"] = "expression",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ratio",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "resultTheirs",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "resultYours",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "comparison",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "expression",
                      ["orig"] = "expression",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "frequency",
                      ["orig"] = "frequency",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "period",
                      ["orig"] = "period",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 0.01,
                      ["kind"] = "query",
                      ["name"] = "rate",
                      ["orig"] = "rate",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "spend",
                      ["orig"] = "spend",
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type_of_item",
                      ["orig"] = "type_of_item",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type_of_money",
                      ["orig"] = "type_of_money",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "wealth_their",
                      ["orig"] = "wealth_their",
                      ["reqd"] = true,
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "wealth_your",
                      ["orig"] = "wealth_your",
                      ["reqd"] = true,
                      ["type"] = "`$ANY`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/comparison",
                ["parts"] = {
                  "comparison",
                },
                ["select"] = {
                  ["exist"] = {
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["discovery"] = {
        ["fields"] = {
          {
            ["name"] = "route",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "discovery",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/expressions",
                ["parts"] = {
                  "expressions",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["wealth_expression"] = {
        ["fields"] = {
          {
            ["name"] = "phrase",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "scale",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "sentence",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "unit",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "value",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "wealth_expression",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "frequency",
                      ["orig"] = "frequency",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "period",
                      ["orig"] = "period",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 0.01,
                      ["kind"] = "query",
                      ["name"] = "rate",
                      ["orig"] = "rate",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "wealth",
                      ["orig"] = "wealth",
                      ["reqd"] = true,
                      ["type"] = "`$ANY`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/growthOfCompoundInterest",
                ["parts"] = {
                  "growthOfCompoundInterest",
                },
                ["select"] = {
                  ["exist"] = {
                    "frequency",
                    "period",
                    "rate",
                    "wealth",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "spend",
                      ["orig"] = "spend",
                      ["reqd"] = true,
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "wealth",
                      ["orig"] = "wealth",
                      ["reqd"] = true,
                      ["type"] = "`$ANY`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/durationOfDailySpend",
                ["parts"] = {
                  "durationOfDailySpend",
                },
                ["select"] = {
                  ["exist"] = {
                    "spend",
                    "wealth",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "type_of_item",
                      ["orig"] = "type_of_item",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "wealth",
                      ["orig"] = "wealth",
                      ["reqd"] = true,
                      ["type"] = "`$ANY`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/numberOfItems",
                ["parts"] = {
                  "numberOfItems",
                },
                ["select"] = {
                  ["exist"] = {
                    "type_of_item",
                    "wealth",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "type_of_money",
                      ["orig"] = "type_of_money",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "wealth",
                      ["orig"] = "wealth",
                      ["reqd"] = true,
                      ["type"] = "`$ANY`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/heightOfMoneyStack",
                ["parts"] = {
                  "heightOfMoneyStack",
                },
                ["select"] = {
                  ["exist"] = {
                    "type_of_money",
                    "wealth",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
