// Typed models for the WeUltrarich SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/we-ultrarich-sdk/go/core"
)

// Comparison is the typed data model for the comparison entity.
type Comparison struct {
	Expression string `json:"expression"`
	Ratio map[string]any `json:"ratio"`
	ResultTheirs map[string]any `json:"resultTheirs"`
	ResultYours map[string]any `json:"resultYours"`
}

// ComparisonLoadMatch is the typed request payload for Comparison.LoadTyped.
type ComparisonLoadMatch struct {
	Expression string `json:"expression"`
	Frequency *string `json:"frequency,omitempty"`
	Period *float64 `json:"period,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
	Spend *any `json:"spend,omitempty"`
	TypeOfItem *string `json:"type_of_item,omitempty"`
	TypeOfMoney *string `json:"type_of_money,omitempty"`
	WealthTheir any `json:"wealth_their"`
	WealthYour any `json:"wealth_your"`
}

// Discovery is the typed data model for the discovery entity.
type Discovery struct {
	Route string `json:"route"`
}

// DiscoveryListMatch is the typed request payload for Discovery.ListTyped.
type DiscoveryListMatch struct {
	Route *string `json:"route,omitempty"`
}

// WealthExpression is the typed data model for the wealth_expression entity.
type WealthExpression struct {
	Phrase string `json:"phrase"`
	Scale string `json:"scale"`
	Sentence string `json:"sentence"`
	Type string `json:"type"`
	Unit string `json:"unit"`
	Value float64 `json:"value"`
}

// WealthExpressionLoadMatch is the typed request payload for WealthExpression.LoadTyped.
type WealthExpressionLoadMatch struct {
	Frequency *string `json:"frequency,omitempty"`
	Period *float64 `json:"period,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
	Wealth any `json:"wealth"`
	Spend *any `json:"spend,omitempty"`
	TypeOfItem *string `json:"type_of_item,omitempty"`
	TypeOfMoney *string `json:"type_of_money,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
