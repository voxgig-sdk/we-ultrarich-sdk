<?php
declare(strict_types=1);

// WeUltrarich SDK utility: feature_hook

class WeUltrarichFeatureHook
{
    public static function call(WeUltrarichContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
