<?php
declare(strict_types=1);

// WeUltrarich SDK utility: result_headers

class WeUltrarichResultHeaders
{
    public static function call(WeUltrarichContext $ctx): ?WeUltrarichResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
