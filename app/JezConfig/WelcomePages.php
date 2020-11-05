<?php

namespace App\JezConfig;

class WelcomePages
{
    private static $welcome_pages = [
        "Area" => [
            "title" => "Areas Homepage",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        "Season" => [
            "title" => "Seasons Homepage",
            "text" => "The Jezreel-Expedition was active in the years 2012-2018.
            This module focuses on the team and the main activities for any given season.",
        ],
        "AreaSeason" => [
            "title" => "Areas/Seasons page",
            "text" => "This module gives brief overviews of the progress in the different areas
                in any specific season.",
        ],
        "Locus" => [
            "title" => "Loci Homepage",
            "text" => "This module displays the different loci found in the dig.",
        ],
        "Pottery" => [
            "title" => "Pottery Homepage",
            "text" => "The Pottery from Tel Ein-Jezreel is of importance as the main Chronological indicator of the different dig areas and loci.
            Only indicative pottery was recorded, and a whole collection of items - a 'basket' was used as the main recording unit.
            Further discussion of individual items - an 'artifact' was thus ommited unless its showed some significant charectaristics...",
        ],
        "Stone" => [
            "title" => "Stones homepage",
            "text" => "Tel Ein-Jezreel yielded a vast collection of stone artifacts.
            Some of the noteable finds include a large Stele, Scarabs,
            a large collection of slingstones and numerous perforated objects.
            Special attention was given to the stones and rather than dumping them in a large pile,
            many were photographed and drawn.",
        ],
        "Lithic" => [
            "title" => "Welcome to the Lithics page",
            "text" => "Let's talk about lithics",
        ],
        "Metal" => [
            "title" => "Welcome to the Metals page",
            "text" => "Let's talk about Metals"],
        "Glass" => [
            "title" => "Welcome to the Glass page",
            "text" => "Let's talk about glass",
        ],
        "Flora" => [
            "title" => "Welcome to the Flora page",
            "text" => "Let's talk about Flora",
        ],
        "Fauna" => [
            "title" => "Welcome to the Fauna page",
            "text" => "Let's talk about fauna",
        ],
        "About" => [
            "title" => "About/Help Homepage",
            "text" => "This website displays the results of the Jezreel-Expedition excavations in
            Tel Ein-Jezreel, Israel. The excavations took place in the years 2012-2018...",
        ],
    ];

    public static function welcome(String $module): array
    {
        return self::$welcome_pages[$module];
    }
}
