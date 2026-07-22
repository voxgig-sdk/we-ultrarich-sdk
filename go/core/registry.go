package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewComparisonEntityFunc func(client *WeUltrarichSDK, entopts map[string]any) WeUltrarichEntity

var NewDiscoveryEntityFunc func(client *WeUltrarichSDK, entopts map[string]any) WeUltrarichEntity

var NewWealthExpressionEntityFunc func(client *WeUltrarichSDK, entopts map[string]any) WeUltrarichEntity

