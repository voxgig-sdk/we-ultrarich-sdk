<?php
declare(strict_types=1);

// WeUltrarich SDK utility: result_body

class WeUltrarichResultBody
{
    public static function call(WeUltrarichContext $ctx): ?WeUltrarichResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
