

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WeUltrarichSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('WealthExpressionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WE_ULTRARICH_TEST_LIVE=TRUE.
  afterEach(liveDelay('WE_ULTRARICH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WeUltrarichSDK.test()
    const ent = testsdk.WealthExpression()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WE_ULTRARICH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'wealth_expression.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"phrase","req":true,"short":"A phrase of the growth of compounded interest (title-cased for use as a standalone label).","type":"`$STRING`","index$":0},{"active":true,"name":"scale","req":true,"short":"A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose).","type":"`$STRING`","index$":1},{"active":true,"name":"sentence","req":true,"short":"A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose).","type":"`$STRING`","index$":2},{"active":true,"name":"type","req":true,"short":"This expression doesn't have any types.","type":"`$STRING`","index$":3},{"active":true,"name":"unit","req":true,"short":"The unit for growth of compounded interest.","type":"`$STRING`","index$":4},{"active":true,"name":"value","req":true,"short":"The value for growth of compounded interest.","type":"`$NUMBER`","index$":5}],"name":"wealth_expression","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"frequency","orig":"frequency","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":20,"kind":"query","name":"period","orig":"period","reqd":true,"type":"`$NUMBER`","index$":1},{"active":true,"example":0.01,"kind":"query","name":"rate","orig":"rate","reqd":true,"type":"`$NUMBER`","index$":2},{"active":true,"kind":"query","name":"wealth","orig":"wealth","reqd":true,"type":"`$ANY`","index$":3}]},"contract":{"id":"GET /growthOfCompoundInterest","json":"{\"operationId\":\"growthOfCompoundInterest\",\"parameters\":[{\"description\":\"Wealth is the amount of money to be described via this expression.\",\"in\":\"query\",\"name\":\"wealth\",\"required\":true,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000000000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}},{\"description\":\"Rate is the interest rate at which the wealth is compounded (one-third of the crux of this expression).\",\"in\":\"query\",\"name\":\"rate\",\"required\":true,\"schema\":{\"example\":0.01,\"exclusiveMaximum\":true,\"exclusiveMinimum\":true,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Frequency is how often the wealth is compounded (one-third of the crux of this expression): * `1` - Annually * `2` - Semiannually * `4` - Quarterly * `12` - Monthly * `365` - Daily\\n\",\"in\":\"query\",\"name\":\"frequency\",\"required\":true,\"schema\":{\"enum\":[\"1\",\"2\",\"4\",\"12\",\"365\"],\"type\":\"string\"}},{\"description\":\"Period is the duration of time in years over which the wealth is compounded (one-third of the crux of this expression).\",\"in\":\"query\",\"name\":\"period\",\"required\":true,\"schema\":{\"example\":20,\"exclusiveMaximum\":true,\"exclusiveMinimum\":true,\"maximum\":100,\"minimum\":0,\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"phrase\":{\"description\":\"A phrase of the growth of compounded interest (title-cased for use as a standalone label).\",\"example\":\"By $220,190,040 Over 20 Years\",\"type\":\"string\"},\"scale\":{\"description\":\"A complete sentence providing context for the expression and its growth of compounded interest result (sentence-cased for use as inline prose).\",\"example\":\"This growth in their wealth — not the principal, just the interest they earned during this single period of time — is approximately 2.2 times the annual recurring revenue goal for a best-in-class startup company (≈$100M).\",\"nullable\":true,\"type\":\"string\"},\"sentence\":{\"description\":\"A complete sentence summarizing the expression and its growth of compounded interest result (sentence-cased for use as inline prose).\",\"example\":\"With 1% interest compounded annually, a person with $1,000,000,000 would grow their wealth by $220,190,040 over 20 years!\",\"type\":\"string\"},\"type\":{\"description\":\"This expression doesn't have any types.\",\"example\":null,\"nullable\":true,\"type\":\"string\"},\"unit\":{\"description\":\"The unit for growth of compounded interest.\",\"example\":\"dollars\",\"type\":\"string\"},\"value\":{\"description\":\"The value for growth of compounded interest.\",\"example\":220190040,\"type\":\"number\"}},\"required\":[\"value\",\"unit\",\"type\",\"phrase\",\"sentence\",\"scale\"],\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"data\"],\"type\":\"object\"}}},\"description\":\"a JSON object with response data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"A human-readable error message like 'Wealth Missing', 'Wealth Malformed', 'Wealth Zero', etc.\",\"example\":\"Wealth Missing\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"a JSON object with error data\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":429,\"type\":\"integer\"},\"details\":{\"example\":\"Rate limit exceeded. Try again in 60 seconds.\",\"type\":\"string\"},\"message\":{\"example\":\"Too Many Requests\",\"type\":\"string\"},\"retryAfter\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"example\":60,\"type\":\"integer\"}},\"required\":[\"code\",\"message\",\"details\",\"retryAfter\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"schema\":{\"example\":60,\"type\":\"integer\"}}}}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/growthOfCompoundInterest","segments":[{"lit":"growthOfCompoundInterest"}],"select":{"exist":["frequency","period","rate","wealth"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"spend","orig":"spend","reqd":true,"type":"`$ANY`","index$":0},{"active":true,"kind":"query","name":"wealth","orig":"wealth","reqd":true,"type":"`$ANY`","index$":1}]},"contract":{"id":"GET /durationOfDailySpend","json":"{\"operationId\":\"durationOfDailySpend\",\"parameters\":[{\"description\":\"Wealth is the amount of money to be described via this expression.\",\"in\":\"query\",\"name\":\"wealth\",\"required\":true,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000000000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}},{\"description\":\"Spend is the amount of money to be spent daily (the crux of this expression).\",\"in\":\"query\",\"name\":\"spend\",\"required\":true,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"phrase\":{\"description\":\"A phrase of the duration of time (title-cased for use as a standalone label).\",\"example\":\"2.7 Millennia (2,740 Years)\",\"type\":\"string\"},\"scale\":{\"description\":\"A complete sentence providing context for the expression and its duration of time result (sentence-cased for use as inline prose).\",\"example\":\"That's approximately 1.4 times as long ago as when modern religions began to take shape in what was considered ancient history (≈4,000 BCE to 1,000 AD).\",\"nullable\":true,\"type\":\"string\"},\"sentence\":{\"description\":\"A complete sentence summarizing the expression and its duration of time result (sentence-cased for use as inline prose).\",\"example\":\"A person with a wealth of $1,000,000,000 could spend $1,000 every day for 2.7 millennia (2,740 years)!\",\"type\":\"string\"},\"type\":{\"description\":\"This expression doesn't have any types.\",\"example\":null,\"nullable\":true,\"type\":\"string\"},\"unit\":{\"description\":\"The unit for duration of time.\",\"example\":\"years\",\"type\":\"string\"},\"value\":{\"description\":\"The value for duration of time.\",\"example\":2739.72602739726,\"type\":\"number\"}},\"required\":[\"value\",\"unit\",\"type\",\"phrase\",\"sentence\",\"scale\"],\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"data\"],\"type\":\"object\"}}},\"description\":\"a JSON object with response data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"A human-readable error message like 'Wealth Missing', 'Wealth Malformed', 'Wealth Zero', etc.\",\"example\":\"Wealth Missing\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"a JSON object with error data\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":429,\"type\":\"integer\"},\"details\":{\"example\":\"Rate limit exceeded. Try again in 60 seconds.\",\"type\":\"string\"},\"message\":{\"example\":\"Too Many Requests\",\"type\":\"string\"},\"retryAfter\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"example\":60,\"type\":\"integer\"}},\"required\":[\"code\",\"message\",\"details\",\"retryAfter\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"schema\":{\"example\":60,\"type\":\"integer\"}}}}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/durationOfDailySpend","segments":[{"lit":"durationOfDailySpend"}],"select":{"exist":["spend","wealth"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"type_of_item","orig":"type_of_item","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"wealth","orig":"wealth","reqd":true,"type":"`$ANY`","index$":1}]},"contract":{"id":"GET /numberOfItems","json":"{\"operationId\":\"numberOfItems\",\"parameters\":[{\"description\":\"Wealth is the amount of money to be described via this expression.\",\"in\":\"query\",\"name\":\"wealth\",\"required\":true,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000000000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}},{\"description\":\"Type Of Item is the item to be bought or paid for/off (the crux of this expression): * `fancy_coffee` - $10 Fancy Coffee * `quick_meal` - $15 Quick Meal * `dinner_with_drinks` - $175 Dinner With Drinks * `iphone` - $1,400 iPhone * `month_of_childcare` - $1,750 Month Of Childcare * `rent_or_mortgage_payment` - $3,000 Rent Or Mortgage Payment * `year_of_low_minimum_wage_salary` - Year Of Low Minimum Wage Salary ($15,080) * `year_of_high_minimum_wage_salary` - Year Of High Minimum Wage Salary ($32,240) * `student_loan_debt` - $40K Student Loan Debt * `car` - $50K Car * `year_of_salary_65k` - Year Of $65,000 Salary * `year_of_salary_100k` - Year Of $100,000 Salary * `luxury_car` - $275K Luxury Car * `house` - $500K House * `yacht` - $800K Yacht * `supercar` - $4M Supercar * `island` - $30M Island * `mansion` - $75M Mansion * `estate_with_a_mega_mansion` - $200M Estate With A Mega-Mansion * `luxury_island` - $300M Luxury Island * `superyacht` - $600M Superyacht\\n\",\"in\":\"query\",\"name\":\"typeOfItem\",\"required\":true,\"schema\":{\"enum\":[\"fancy_coffee\",\"quick_meal\",\"dinner_with_drinks\",\"iphone\",\"month_of_childcare\",\"rent_or_mortgage_payment\",\"year_of_low_minimum_wage_salary\",\"year_of_high_minimum_wage_salary\",\"student_loan_debt\",\"car\",\"year_of_salary_65k\",\"year_of_salary_100k\",\"luxury_car\",\"house\",\"yacht\",\"supercar\",\"island\",\"mansion\",\"estate_with_a_mega_mansion\",\"luxury_island\",\"superyacht\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"phrase\":{\"description\":\"A phrase of the number of items bought or paid for/off (title-cased for use as a standalone label).\",\"example\":\"2,000 Houses\",\"type\":\"string\"},\"scale\":{\"description\":\"A complete sentence providing context for the expression and its number of items bought or paid for/off result (sentence-cased for use as inline prose).\",\"example\":\"That's approximately 1.3 times enough for every person in a village (typically between 1K–10K population).\",\"nullable\":true,\"type\":\"string\"},\"sentence\":{\"description\":\"A complete sentence summarizing the expression and its number of items bought or paid for/off result (sentence-cased for use as inline prose).\",\"example\":\"A person with a wealth of $1,000,000,000 could buy 2,000 houses all at once!\",\"type\":\"string\"},\"type\":{\"description\":\"The kind of item bought or paid for/off.\",\"example\":\"houses\",\"type\":\"string\"},\"unit\":{\"description\":\"This expression doesn't have any units.\",\"example\":null,\"nullable\":true,\"type\":\"string\"},\"value\":{\"description\":\"The number of items bought or paid for/off.\",\"example\":2000,\"type\":\"number\"}},\"required\":[\"value\",\"unit\",\"type\",\"phrase\",\"sentence\",\"scale\"],\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"data\"],\"type\":\"object\"}}},\"description\":\"a JSON object with response data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"A human-readable error message like 'Wealth Missing', 'Wealth Malformed', 'Wealth Zero', etc.\",\"example\":\"Wealth Missing\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"a JSON object with error data\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":429,\"type\":\"integer\"},\"details\":{\"example\":\"Rate limit exceeded. Try again in 60 seconds.\",\"type\":\"string\"},\"message\":{\"example\":\"Too Many Requests\",\"type\":\"string\"},\"retryAfter\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"example\":60,\"type\":\"integer\"}},\"required\":[\"code\",\"message\",\"details\",\"retryAfter\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"schema\":{\"example\":60,\"type\":\"integer\"}}}}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/numberOfItems","segments":[{"lit":"numberOfItems"}],"select":{"exist":["type_of_item","wealth"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"type_of_money","orig":"type_of_money","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"wealth","orig":"wealth","reqd":true,"type":"`$ANY`","index$":1}]},"contract":{"id":"GET /heightOfMoneyStack","json":"{\"operationId\":\"heightOfMoneyStack\",\"parameters\":[{\"description\":\"Wealth is the amount of money to be described via this expression.\",\"in\":\"query\",\"name\":\"wealth\",\"required\":true,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000000000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}},{\"description\":\"Type Of Money is the money to be stacked (the crux of this expression): * `usd_1_coin` - Dollar Coins (USD; 2 mm per coin); * `usd_100_bill` - Hundred-Dollar Bills (USD; 0.11 mm per bill); * `cad_1_coin` - Loonies (CAD; 1.95 mm per coin); * `cad_100_bill` - Hundred-Dollar Bills (CAD; 0.0875 mm per bill); * `eur_1_coin` - Euro Coins (EUR; 2.33 mm per coin); * `eur_100_bill` - Hundred-Euro Bills (EUR; 0.12 mm per bill); * `gbp_1_coin` - Pound Coins (GBP; 2.8 mm per coin); * `gbp_100_bill` - Hundred-Pound Bills (GBP; 0.0825 mm per bill); * `cny_1_coin` - Yuan Coins (CNY; 1.85 mm per coin); * `cny_100_bill` - Hundred-Yuan Bills (CNY; 0.1 mm per bill); * `inr_1_coin` - Rupee Coins (INR; 1.45 mm per coin); * `inr_100_bill` - Hundred-Rupee Bills (INR; 0.11 mm per bill); * `krw_1_coin` - Won Coins (KRW; 1.45 mm per coin); * `krw_1000_bill` - Thousand-Won Bills (KRW; 0.1 mm per bill); * `rub_1_coin` - Ruble Coins (RUB; 1.5 mm per coin); * `rub_100_bill` - Hundred-Ruble Bills (RUB; 0.1 mm per bill); * `try_1_coin` - Lira Coins (TRY; 2 mm per coin); * `try_100_bill` - Hundred-Lira Bills (TRY; 0.105 mm per bill); * `chf_1_coin` - Franc Coins (CHF; 1.55 mm per coin); * `chf_100_bill` - Hundred-Franc Bills (CHF; 0.11 mm per bill); * `brl_1_coin` - Real Coins (BRL; 1.95 mm per coin); or * `brl_100_bill` - Hundred-Real Bills (BRL; 0.105 mm per bill).\\n\",\"in\":\"query\",\"name\":\"typeOfMoney\",\"required\":true,\"schema\":{\"enum\":[\"usd_1_coin\",\"usd_100_bill\",\"cad_1_coin\",\"cad_100_bill\",\"eur_1_coin\",\"eur_100_bill\",\"gbp_1_coin\",\"gbp_100_bill\",\"cny_1_coin\",\"cny_100_bill\",\"inr_1_coin\",\"inr_100_bill\",\"krw_1_coin\",\"krw_1000_bill\",\"rub_1_coin\",\"rub_100_bill\",\"try_1_coin\",\"try_100_bill\",\"chf_1_coin\",\"chf_100_bill\",\"brl_1_coin\",\"brl_100_bill\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"phrase\":{\"description\":\"A phrase of the height (title-cased for use as a standalone label).\",\"example\":\"1,243 Miles (2,000 km)\",\"type\":\"string\"},\"scale\":{\"description\":\"A complete sentence providing context for the expression and its height result (sentence-cased for use as inline prose).\",\"example\":\"That's about 10 times the distance of a roundtrip to the edge of space (Kármán Line).\",\"nullable\":true,\"type\":\"string\"},\"sentence\":{\"description\":\"A complete sentence summarizing the expression and its height result (sentence-cased for use as inline prose).\",\"example\":\"A person with a wealth of $1,000,000,000 would have a stack of dollar coins 1,243 miles (2,000 km) high!\",\"type\":\"string\"},\"type\":{\"description\":\"The kind of stacked money (coins or bills) customized for inputted currency type.\",\"example\":\"dollar coins\",\"type\":\"string\"},\"unit\":{\"description\":\"The unit for height.\",\"example\":\"meters\",\"type\":\"string\"},\"value\":{\"description\":\"The value for height.\",\"example\":2000000,\"type\":\"number\"}},\"required\":[\"value\",\"unit\",\"type\",\"phrase\",\"sentence\",\"scale\"],\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"data\"],\"type\":\"object\"}}},\"description\":\"a JSON object with response data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"A human-readable error message like 'Wealth Missing', 'Wealth Malformed', 'Wealth Zero', etc.\",\"example\":\"Wealth Missing\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"a JSON object with error data\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":429,\"type\":\"integer\"},\"details\":{\"example\":\"Rate limit exceeded. Try again in 60 seconds.\",\"type\":\"string\"},\"message\":{\"example\":\"Too Many Requests\",\"type\":\"string\"},\"retryAfter\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"example\":60,\"type\":\"integer\"}},\"required\":[\"code\",\"message\",\"details\",\"retryAfter\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"schema\":{\"example\":60,\"type\":\"integer\"}}}}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/heightOfMoneyStack","segments":[{"lit":"heightOfMoneyStack"}],"select":{"exist":["type_of_money","wealth"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"wealth_expression","name__orig":"wealth_expression","Name":"WealthExpression","name_":"wealth_expression","name-":"wealth-expression","NAME":"WEALTH_EXPRESSION","index$":2}, {"active":true,"entity":"wealth_expression","key$":"BasicWealthExpressionFlow","kind":"basic","name":"BasicWealthExpressionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"wealth_expression_ref01","srcdatavar":"wealth_expression_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-wealth_expression_ref01"}}],"index$":0}]}, 'WealthExpression')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let wealth_expression_ref01_data = Object.values(setup.data.existing.wealth_expression)[0] as any

    // LOAD
    const wealth_expression_ref01_ent = client.WealthExpression()
    const wealth_expression_ref01_match_dt0: any = {}
    const wealth_expression_ref01_data_dt0 = (await wealth_expression_ref01_ent.load(wealth_expression_ref01_match_dt0)).data()
    assert(null != wealth_expression_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/wealth_expression/WealthExpressionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WeUltrarichSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['wealth_expression01','wealth_expression02','wealth_expression03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WE_ULTRARICH_TEST_WEALTH_EXPRESSION_ENTID': idmap,
    'WE_ULTRARICH_TEST_LIVE': 'FALSE',
    'WE_ULTRARICH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WE_ULTRARICH_TEST_WEALTH_EXPRESSION_ENTID']

  const live = 'TRUE' === env.WE_ULTRARICH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WE_ULTRARICH_TEST_WEALTH_EXPRESSION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WeUltrarichSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.WE_ULTRARICH_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
