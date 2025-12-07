<?php

namespace App\Services\App\Configs;

interface ModuleInitDetailsInterface
{
    public static function displayOptions(): array;
    public static function welcomeText(): array;
    public static function categories(): array;
}
