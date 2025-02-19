<?php

namespace App\Services\App;

interface InitDetailsInterface
{
    public static function displayOptions(): array;
    public static function welcomeText(): array;
    public static function categories(): array;
}
