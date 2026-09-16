# WeUltrarich SDK feature factory

from weultrarich_sdk.feature.base_feature import WeUltrarichBaseFeature
from weultrarich_sdk.feature.ratelimit_feature import WeUltrarichRatelimitFeature
from weultrarich_sdk.feature.retry_feature import WeUltrarichRetryFeature
from weultrarich_sdk.feature.test_feature import WeUltrarichTestFeature
from weultrarich_sdk.feature.timeout_feature import WeUltrarichTimeoutFeature


_FEATURES = {
    "base": lambda: WeUltrarichBaseFeature(),
    "ratelimit": lambda: WeUltrarichRatelimitFeature(),
    "retry": lambda: WeUltrarichRetryFeature(),
    "test": lambda: WeUltrarichTestFeature(),
    "timeout": lambda: WeUltrarichTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
