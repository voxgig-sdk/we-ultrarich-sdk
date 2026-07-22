<?php
declare(strict_types=1);

// WeUltrarich SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class WeUltrarichFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new WeUltrarichBaseFeature();
            case "test":
                return new WeUltrarichTestFeature();
            default:
                return new WeUltrarichBaseFeature();
        }
    }
}
