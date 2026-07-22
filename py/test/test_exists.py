# ProjectName SDK exists test

import pytest
from weultrarich_sdk import WeUltrarichSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WeUltrarichSDK.test(None, None)
        assert testsdk is not None
