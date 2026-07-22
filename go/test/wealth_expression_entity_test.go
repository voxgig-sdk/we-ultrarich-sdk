package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/we-ultrarich-sdk/go"
	"github.com/voxgig-sdk/we-ultrarich-sdk/go/core"

	vs "github.com/voxgig-sdk/we-ultrarich-sdk/go/utility/struct"
)

func TestWealthExpressionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.WealthExpression(nil)
		if ent == nil {
			t.Fatal("expected non-nil WealthExpressionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := wealth_expressionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "wealth_expression." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set WEULTRARICH_TEST_WEALTH_EXPRESSION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		wealthExpressionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.wealth_expression", setup.data)))
		var wealthExpressionRef01Data map[string]any
		if len(wealthExpressionRef01DataRaw) > 0 {
			wealthExpressionRef01Data = core.ToMapAny(wealthExpressionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = wealthExpressionRef01Data

		// LOAD
		wealthExpressionRef01Ent := client.WealthExpression(nil)
		wealthExpressionRef01MatchDt0 := map[string]any{}
		wealthExpressionRef01DataDt0Loaded, err := wealthExpressionRef01Ent.Load(wealthExpressionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if wealthExpressionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func wealth_expressionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "wealth_expression", "WealthExpressionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read wealth_expression test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse wealth_expression test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"wealth_expression01", "wealth_expression02", "wealth_expression03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("WEULTRARICH_TEST_WEALTH_EXPRESSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WEULTRARICH_TEST_WEALTH_EXPRESSION_ENTID": idmap,
		"WEULTRARICH_TEST_LIVE":      "FALSE",
		"WEULTRARICH_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["WEULTRARICH_TEST_WEALTH_EXPRESSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["WEULTRARICH_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewWeUltrarichSDK(core.ToMapAny(mergedOpts))
	}

	live := env["WEULTRARICH_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["WEULTRARICH_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
