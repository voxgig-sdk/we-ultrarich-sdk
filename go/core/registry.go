package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewComparisonEntityFunc func(client *WeUltrarichSDK, entopts map[string]any) WeUltrarichEntity

var NewDiscoveryEntityFunc func(client *WeUltrarichSDK, entopts map[string]any) WeUltrarichEntity

var NewWealthExpressionEntityFunc func(client *WeUltrarichSDK, entopts map[string]any) WeUltrarichEntity

