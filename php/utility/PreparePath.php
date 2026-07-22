<?php
declare(strict_types=1);

// WeUltrarich SDK utility: prepare_path

class WeUltrarichPreparePath
{
    public static function call(WeUltrarichContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
