<?php
declare(strict_types=1);

// WeUltrarich SDK utility: prepare_body

class WeUltrarichPrepareBody
{
    public static function call(WeUltrarichContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
