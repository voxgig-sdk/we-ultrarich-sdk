"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ComparisonEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WE_ULTRARICH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WE_ULTRARICH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WeUltrarichSDK.test();
        const ent = testsdk.Comparison();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WE_ULTRARICH_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'comparison.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "expression", "req": true, "short": "The expression that was computed for both wealths (echoed so the payload is self-describing).", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "ratio", "req": true, "short": "The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger).", "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "resultTheirs", "req": true, "short": "The expression's result for wealthTheirs.", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "resultYours", "req": true, "short": "The expression's result for wealthYours.", "type": "`$OBJECT`", "index$": 3 }], "name": "comparison", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "expression", "orig": "expression", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "frequency", "orig": "frequency", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 20, "kind": "query", "name": "period", "orig": "period", "reqd": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "example": 0.01, "kind": "query", "name": "rate", "orig": "rate", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "kind": "query", "name": "spend", "orig": "spend", "reqd": false, "type": "`$ANY`", "index$": 4 }, { "active": true, "kind": "query", "name": "type_of_item", "orig": "type_of_item", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "type_of_money", "orig": "type_of_money", "reqd": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "kind": "query", "name": "wealth_their", "orig": "wealth_their", "reqd": true, "type": "`$ANY`", "index$": 7 }, { "active": true, "kind": "query", "name": "wealth_your", "orig": "wealth_your", "reqd": true, "type": "`$ANY`", "index$": 8 }] }, "contract": { "id": "GET /comparison", "json": "{\"operationId\":\"comparison\",\"parameters\":[{\"description\":\"Expression is the wealth expression to compute for both wealths (the crux of this comparison): * `durationOfDailySpend` - also requires `spend` * `heightOfMoneyStack` - also requires `typeOfMoney` * `numberOfItems` - also requires `typeOfItem` * `growthOfCompoundInterest` - also requires `rate`, `frequency`, and `period`\\n\",\"in\":\"query\",\"name\":\"expression\",\"required\":true,\"schema\":{\"enum\":[\"durationOfDailySpend\",\"heightOfMoneyStack\",\"numberOfItems\",\"growthOfCompoundInterest\"],\"type\":\"string\"}},{\"description\":\"Wealth Yours is the amount of money of the user (\\\"your\\\" wealth) to be compared via the specified expression.\",\"in\":\"query\",\"name\":\"wealthYours\",\"required\":true,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000000000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}},{\"description\":\"Wealth Theirs is the amount of money of the ultrarich (\\\"their\\\" wealth) to be compared via the specified expression.\",\"in\":\"query\",\"name\":\"wealthTheirs\",\"required\":true,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000000000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}},{\"description\":\"Spend is the amount of money to be spent daily. Required when expression is durationOfDailySpend; ignored otherwise.\",\"in\":\"query\",\"name\":\"spend\",\"required\":false,\"schema\":{\"oneOf\":[{\"description\":\"a numeric amount with or without decimal places\",\"example\":1000,\"maximum\":1e+24,\"minimum\":1,\"type\":\"number\"},{\"description\":\"a string with a local-formatted number (like 1,000,000) or shorthand (like 1M) with or without a URL-encoded currency symbol\",\"type\":\"string\"}]}},{\"description\":\"Type Of Money is the money to be stacked. Required when expression is heightOfMoneyStack; ignored otherwise. * `usd_1_coin` - Dollar Coins (USD; 2 mm per coin); * `usd_100_bill` - Hundred-Dollar Bills (USD; 0.11 mm per bill); * `cad_1_coin` - Loonies (CAD; 1.95 mm per coin); * `cad_100_bill` - Hundred-Dollar Bills (CAD; 0.0875 mm per bill); * `eur_1_coin` - Euro Coins (EUR; 2.33 mm per coin); * `eur_100_bill` - Hundred-Euro Bills (EUR; 0.12 mm per bill); * `gbp_1_coin` - Pound Coins (GBP; 2.8 mm per coin); * `gbp_100_bill` - Hundred-Pound Bills (GBP; 0.0825 mm per bill); * `cny_1_coin` - Yuan Coins (CNY; 1.85 mm per coin); * `cny_100_bill` - Hundred-Yuan Bills (CNY; 0.1 mm per bill); * `inr_1_coin` - Rupee Coins (INR; 1.45 mm per coin); * `inr_100_bill` - Hundred-Rupee Bills (INR; 0.11 mm per bill); * `krw_1_coin` - Won Coins (KRW; 1.45 mm per coin); * `krw_1000_bill` - Thousand-Won Bills (KRW; 0.1 mm per bill); * `rub_1_coin` - Ruble Coins (RUB; 1.5 mm per coin); * `rub_100_bill` - Hundred-Ruble Bills (RUB; 0.1 mm per bill); * `try_1_coin` - Lira Coins (TRY; 2 mm per coin); * `try_100_bill` - Hundred-Lira Bills (TRY; 0.105 mm per bill); * `chf_1_coin` - Franc Coins (CHF; 1.55 mm per coin); * `chf_100_bill` - Hundred-Franc Bills (CHF; 0.11 mm per bill); * `brl_1_coin` - Real Coins (BRL; 1.95 mm per coin); or * `brl_100_bill` - Hundred-Real Bills (BRL; 0.105 mm per bill).\\n\",\"in\":\"query\",\"name\":\"typeOfMoney\",\"required\":false,\"schema\":{\"enum\":[\"usd_1_coin\",\"usd_100_bill\",\"cad_1_coin\",\"cad_100_bill\",\"eur_1_coin\",\"eur_100_bill\",\"gbp_1_coin\",\"gbp_100_bill\",\"cny_1_coin\",\"cny_100_bill\",\"inr_1_coin\",\"inr_100_bill\",\"krw_1_coin\",\"krw_1000_bill\",\"rub_1_coin\",\"rub_100_bill\",\"try_1_coin\",\"try_100_bill\",\"chf_1_coin\",\"chf_100_bill\",\"brl_1_coin\",\"brl_100_bill\"],\"type\":\"string\"}},{\"description\":\"Type Of Item is the item to be bought or paid for/off. Required when expression is numberOfItems; ignored otherwise. * `fancy_coffee` - $10 Fancy Coffee * `quick_meal` - $15 Quick Meal * `dinner_with_drinks` - $175 Dinner With Drinks * `iphone` - $1,400 iPhone * `month_of_childcare` - $1,750 Month Of Childcare * `rent_or_mortgage_payment` - $3,000 Rent Or Mortgage Payment * `year_of_low_minimum_wage_salary` - Year Of Low Minimum Wage Salary ($15,080) * `year_of_high_minimum_wage_salary` - Year Of High Minimum Wage Salary ($32,240) * `student_loan_debt` - $40K Student Loan Debt * `car` - $50K Car * `year_of_salary_65k` - Year Of $65,000 Salary * `year_of_salary_100k` - Year Of $100,000 Salary * `luxury_car` - $275K Luxury Car * `house` - $500K House * `yacht` - $800K Yacht * `supercar` - $4M Supercar * `island` - $30M Island * `mansion` - $75M Mansion * `estate_with_a_mega_mansion` - $200M Estate With A Mega-Mansion * `luxury_island` - $300M Luxury Island * `superyacht` - $600M Superyacht\\n\",\"in\":\"query\",\"name\":\"typeOfItem\",\"required\":false,\"schema\":{\"enum\":[\"fancy_coffee\",\"quick_meal\",\"dinner_with_drinks\",\"iphone\",\"month_of_childcare\",\"rent_or_mortgage_payment\",\"year_of_low_minimum_wage_salary\",\"year_of_high_minimum_wage_salary\",\"student_loan_debt\",\"car\",\"year_of_salary_65k\",\"year_of_salary_100k\",\"luxury_car\",\"house\",\"yacht\",\"supercar\",\"island\",\"mansion\",\"estate_with_a_mega_mansion\",\"luxury_island\",\"superyacht\"],\"type\":\"string\"}},{\"description\":\"Rate is the interest rate at which the wealths are compounded. Required when expression is growthOfCompoundInterest; ignored otherwise.\",\"in\":\"query\",\"name\":\"rate\",\"required\":false,\"schema\":{\"example\":0.01,\"exclusiveMaximum\":true,\"exclusiveMinimum\":true,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Frequency is how often the wealths are compounded (1 Annually; 2 Semiannually; 4 Quarterly; 12 Monthly; 365 Daily). Required when expression is growthOfCompoundInterest; ignored otherwise.\",\"in\":\"query\",\"name\":\"frequency\",\"required\":false,\"schema\":{\"enum\":[\"1\",\"2\",\"4\",\"12\",\"365\"],\"type\":\"string\"}},{\"description\":\"Period is the duration of time in years over which the wealths are compounded. Required when expression is growthOfCompoundInterest; ignored otherwise.\",\"in\":\"query\",\"name\":\"period\",\"required\":false,\"schema\":{\"example\":20,\"exclusiveMaximum\":true,\"exclusiveMinimum\":true,\"maximum\":100,\"minimum\":0,\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"expression\":{\"description\":\"The expression that was computed for both wealths (echoed so the payload is self-describing).\",\"example\":\"durationOfDailySpend\",\"type\":\"string\"},\"ratio\":{\"description\":\"The ratio between the two wealths (wealthTheirs divided by wealthYours; values below 1 mean wealthYours is the larger).\",\"properties\":{\"phrase\":{\"description\":\"A phrase of the ratio with the 1 on the smaller side (title-cased for use as a standalone label).\",\"example\":\"1,000,000 : 1\",\"type\":\"string\"},\"scale\":{\"description\":\"A complete sentence assessing the ratio, tiered by magnitude (ratios of 200-to-1 or more are described as extreme wealth inequality, per IMF context).\",\"example\":\"That's extreme wealth inequality.\",\"nullable\":true,\"type\":\"string\"},\"sentence\":{\"description\":\"A complete direction-aware sentence summarizing the ratio (sentence-cased for use as inline prose).\",\"example\":\"Their wealth is 1,000,000 times yours.\",\"type\":\"string\"},\"value\":{\"description\":\"The raw numeric ratio of wealthTheirs to wealthYours.\",\"example\":1000000,\"type\":\"number\"}},\"required\":[\"value\",\"phrase\",\"sentence\",\"scale\"],\"type\":\"object\"},\"resultTheirs\":{\"description\":\"The expression's result for wealthTheirs. Same shape as the expression's own endpoint response data.\",\"properties\":{\"phrase\":{\"description\":\"A phrase of the result (title-cased for use as a standalone label).\",\"example\":\"274 Millennia (273,973 Years)\",\"type\":\"string\"},\"scale\":{\"description\":\"A complete sentence providing context for the result (sentence-cased for use as inline prose).\",\"example\":\"That's approximately 1.6 times as long ago as when Homo Sapiens began wearing primitive clothing (≈170K BCE).\",\"nullable\":true,\"type\":\"string\"},\"sentence\":{\"description\":\"A complete sentence summarizing the expression and its result (sentence-cased for use as inline prose).\",\"example\":\"A person with a wealth of $100,000,000,000 could spend $1,000 every day for 274 millennia (273,973 years)!\",\"type\":\"string\"},\"type\":{\"description\":\"The type of result (kind of stacked money, kind of item, or null).\",\"example\":null,\"nullable\":true,\"type\":\"string\"},\"unit\":{\"description\":\"The unit of the value (where applicable).\",\"example\":\"years\",\"nullable\":true,\"type\":\"string\"},\"value\":{\"description\":\"The raw numeric result for their wealth.\",\"example\":273972.602739726,\"type\":\"number\"}},\"required\":[\"value\",\"unit\",\"type\",\"phrase\",\"sentence\",\"scale\"],\"type\":\"object\"},\"resultYours\":{\"description\":\"The expression's result for wealthYours. Same shape as the expression's own endpoint response data.\",\"properties\":{\"phrase\":{\"description\":\"A phrase of the result (title-cased for use as a standalone label).\",\"example\":\"100 Days\",\"type\":\"string\"},\"scale\":{\"description\":\"A complete sentence providing context for the result (sentence-cased for use as inline prose).\",\"example\":null,\"nullable\":true,\"type\":\"string\"},\"sentence\":{\"description\":\"A complete sentence summarizing the expression and its result (sentence-cased for use as inline prose).\",\"example\":\"A person with a wealth of $100,000 could spend $1,000 every day for 100 days!\",\"type\":\"string\"},\"type\":{\"description\":\"The type of result (kind of stacked money, kind of item, or null).\",\"example\":null,\"nullable\":true,\"type\":\"string\"},\"unit\":{\"description\":\"The unit of the value (where applicable).\",\"example\":\"years\",\"nullable\":true,\"type\":\"string\"},\"value\":{\"description\":\"The raw numeric result for your wealth.\",\"example\":0.273972602739726,\"type\":\"number\"}},\"required\":[\"value\",\"unit\",\"type\",\"phrase\",\"sentence\",\"scale\"],\"type\":\"object\"}},\"required\":[\"expression\",\"resultTheirs\",\"resultYours\",\"ratio\"],\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"data\"],\"type\":\"object\"}}},\"description\":\"a JSON object with response data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"A human-readable error message like 'Expression Invalid', 'Your Wealth Zero', 'Their Wealth Missing', etc.\",\"example\":\"Their Wealth Missing\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"a JSON object with error data\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":429,\"type\":\"integer\"},\"details\":{\"example\":\"Rate limit exceeded. Try again in 60 seconds.\",\"type\":\"string\"},\"message\":{\"example\":\"Too Many Requests\",\"type\":\"string\"},\"retryAfter\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"example\":60,\"type\":\"integer\"}},\"required\":[\"code\",\"message\",\"details\",\"retryAfter\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"schema\":{\"example\":60,\"type\":\"integer\"}}}}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/comparison", "segments": [{ "lit": "comparison" }], "select": { "exist": ["expression", "frequency", "period", "rate", "spend", "type_of_item", "type_of_money", "wealth_their", "wealth_your"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "comparison", "name__orig": "comparison", "Name": "Comparison", "name_": "comparison", "name-": "comparison", "NAME": "COMPARISON", "index$": 0 }, { "active": true, "entity": "comparison", "key$": "BasicComparisonFlow", "kind": "basic", "name": "BasicComparisonFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "comparison_ref01", "srcdatavar": "comparison_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-comparison_ref01" } }], "index$": 0 }] }, 'Comparison');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let comparison_ref01_data = Object.values(setup.data.existing.comparison)[0];
        // LOAD
        const comparison_ref01_ent = client.Comparison();
        const comparison_ref01_match_dt0 = {};
        const comparison_ref01_data_dt0 = (await comparison_ref01_ent.load(comparison_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != comparison_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/comparison/ComparisonTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WeUltrarichSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['comparison01', 'comparison02', 'comparison03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WE_ULTRARICH_TEST_COMPARISON_ENTID': idmap,
        'WE_ULTRARICH_TEST_LIVE': 'FALSE',
        'WE_ULTRARICH_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WE_ULTRARICH_TEST_COMPARISON_ENTID'];
    const live = 'TRUE' === env.WE_ULTRARICH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WE_ULTRARICH_TEST_COMPARISON_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WeUltrarichSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ComparisonEntity.test.js.map