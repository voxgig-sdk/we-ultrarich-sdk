# WeUltrarich SDK utility: make_context

from projectname_sdk.core.context import WeUltrarichContext


def make_context_util(ctxmap, basectx):
    return WeUltrarichContext(ctxmap, basectx)
