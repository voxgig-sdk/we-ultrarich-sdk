

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


describe('DiscoveryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WE_ULTRARICH_TEST_LIVE=TRUE.
  afterEach(liveDelay('WE_ULTRARICH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WeUltrarichSDK.test()
    const ent = testsdk.Discovery()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WE_ULTRARICH_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'discovery.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"route","req":true,"short":"The path to each available wealth expression.","type":"`$STRING`","index$":0}],"name":"discovery","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /expressions","json":"{\"operationId\":\"expressions\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"example\":[{\"route\":\"/v1/durationOfDailySpend\"},{\"route\":\"/v1/heightOfMoneyStack\"},{\"route\":\"/v1/numberOfItems\"},{\"route\":\"/v1/growthOfCompoundInterest\"},{\"route\":\"/v1/comparison\"}],\"items\":{\"properties\":{\"route\":{\"description\":\"The path to each available wealth expression.\",\"type\":\"string\"}},\"required\":[\"route\"],\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"data\"],\"type\":\"object\"}}},\"description\":\"a JSON object with response data\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":429,\"type\":\"integer\"},\"details\":{\"example\":\"Rate limit exceeded. Try again in 60 seconds.\",\"type\":\"string\"},\"message\":{\"example\":\"Too Many Requests\",\"type\":\"string\"},\"retryAfter\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"example\":60,\"type\":\"integer\"}},\"required\":[\"code\",\"message\",\"details\",\"retryAfter\"],\"type\":\"object\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"The number of seconds remaining until the rate-limit window resets.\",\"schema\":{\"example\":60,\"type\":\"integer\"}}}}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/expressions","segments":[{"lit":"expressions"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"discovery","name__orig":"discovery","Name":"Discovery","name_":"discovery","name-":"discovery","NAME":"DISCOVERY","index$":1}, {"active":true,"entity":"discovery","key$":"BasicDiscoveryFlow","kind":"basic","name":"BasicDiscoveryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"discovery_ref01"}}],"index$":0}]}, 'Discovery')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let discovery_ref01_data = Object.values(setup.data.existing.discovery)[0] as any

    // LIST
    const discovery_ref01_ent = client.Discovery()
    const discovery_ref01_match: any = {}

    const discovery_ref01_list = (await discovery_ref01_ent.list(discovery_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/discovery/DiscoveryTestData.json')

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
    ['discovery01','discovery02','discovery03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WE_ULTRARICH_TEST_DISCOVERY_ENTID': idmap,
    'WE_ULTRARICH_TEST_LIVE': 'FALSE',
    'WE_ULTRARICH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WE_ULTRARICH_TEST_DISCOVERY_ENTID']

  const live = 'TRUE' === env.WE_ULTRARICH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WE_ULTRARICH_TEST_DISCOVERY_ENTID']
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
  
