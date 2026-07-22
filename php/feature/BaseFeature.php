<?php
declare(strict_types=1);

// WeUltrarich SDK base feature

class WeUltrarichBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WeUltrarichContext $ctx, array $options): void {}
    public function PostConstruct(WeUltrarichContext $ctx): void {}
    public function PostConstructEntity(WeUltrarichContext $ctx): void {}
    public function SetData(WeUltrarichContext $ctx): void {}
    public function GetData(WeUltrarichContext $ctx): void {}
    public function GetMatch(WeUltrarichContext $ctx): void {}
    public function SetMatch(WeUltrarichContext $ctx): void {}
    public function PrePoint(WeUltrarichContext $ctx): void {}
    public function PreSpec(WeUltrarichContext $ctx): void {}
    public function PreRequest(WeUltrarichContext $ctx): void {}
    public function PreResponse(WeUltrarichContext $ctx): void {}
    public function PreResult(WeUltrarichContext $ctx): void {}
    public function PreDone(WeUltrarichContext $ctx): void {}
    public function PreUnexpected(WeUltrarichContext $ctx): void {}
}
