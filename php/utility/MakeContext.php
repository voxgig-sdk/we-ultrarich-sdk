<?php
declare(strict_types=1);

// WeUltrarich SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WeUltrarichMakeContext
{
    public static function call(array $ctxmap, ?WeUltrarichContext $basectx): WeUltrarichContext
    {
        return new WeUltrarichContext($ctxmap, $basectx);
    }
}
