<?php

namespace App\JezConfig;

class WelcomePages
{
    private static $welcome_pages = [
        "Area" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
        "Season" => ["title" => "Welcome to the Seasons page", "text" => "Let's talk about seasons"],
        "AreaSeason" => ["title" => "Welcome to the AreaSeason page", "text" => "Let's talk about AreaSeason"],
        "Locus" => ["title" => "Welcome to the Locus page", "text" => "Let's talk about Loci"],
        "Pottery" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
        "Stone" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
        "Lithic" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
        "Metal" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
        "Glass" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
        "Flora" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
        "Fauna" => ["title" => "Welcome to the Area page", "text" => "Let's talk about areas"],
    ];

    public static function welcome(String $module): array
    {
        return self::$welcome_pages[$module];
    }
}
