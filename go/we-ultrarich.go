package voxgigweultrarichsdk

import (
	"github.com/voxgig-sdk/we-ultrarich-sdk/go/core"
	"github.com/voxgig-sdk/we-ultrarich-sdk/go/entity"
	"github.com/voxgig-sdk/we-ultrarich-sdk/go/feature"
	_ "github.com/voxgig-sdk/we-ultrarich-sdk/go/utility"
)

// Type aliases preserve external API.
type WeUltrarichSDK = core.WeUltrarichSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WeUltrarichEntity = core.WeUltrarichEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WeUltrarichError = core.WeUltrarichError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewComparisonEntityFunc = func(client *core.WeUltrarichSDK, entopts map[string]any) core.WeUltrarichEntity {
		return entity.NewComparisonEntity(client, entopts)
	}
	core.NewDiscoveryEntityFunc = func(client *core.WeUltrarichSDK, entopts map[string]any) core.WeUltrarichEntity {
		return entity.NewDiscoveryEntity(client, entopts)
	}
	core.NewWealthExpressionEntityFunc = func(client *core.WeUltrarichSDK, entopts map[string]any) core.WeUltrarichEntity {
		return entity.NewWealthExpressionEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWeUltrarichSDK = core.NewWeUltrarichSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWeUltrarichSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WeUltrarichSDK  { return NewWeUltrarichSDK(nil) }
func Test() *WeUltrarichSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
