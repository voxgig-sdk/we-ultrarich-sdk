# WeUltrarich SDK feature factory

from weultrarich_sdk.feature.base_feature import WeUltrarichBaseFeature
from weultrarich_sdk.feature.test_feature import WeUltrarichTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WeUltrarichBaseFeature(),
        "test": lambda: WeUltrarichTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
