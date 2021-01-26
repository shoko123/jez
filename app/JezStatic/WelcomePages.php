<?php

namespace App\JezStatic;

class WelcomePages
{
    private static $welcome_pages = [
        "Area" => [
            "title" => "Areas Home Page",
            "text" => "This module describes the areas surveyed or excavated by the Jezreel Expedition 2012-2018.",
        ],
        "Season" => [
            "title" => "Seasons Home Page",
            "text" => "This module describes the Jezreel Expedition's 2012 survey season and 2013-2018 excavation seasons.",
        ],
        "AreaSeason" => [
            "title" => "Areas/Seasons Home Page",
            "text" => "This module gives a brief overview of the results in each area by season.",
        ],
        "Locus" => [
            "title" => "Loci Home Page",
            "text" => "This module displays all of the loci from the 2012 survey season and six excavation seasons. (2013-2018).",
        ],
        "Pottery" => [
            "title" => "Pottery Home Page",
            "text" => "This module displays the indicative pottery excavated by the Jezreel Expedition according to locus and basket.
            The pottery assemblage also includes ceramic artifacts like figurines, andirons, and spindle whorls.",
        ],
        "Stone" => [
            "title" => "Stones Home Page",
            "text" => "This module displays the large and diverse collection of stone artifacts found at the site.
            While most are ground stone tools, this assemblage also includes small finds like slingstones, scaraboid seals, and tesserae
            and larger finds like standing stones and architectural fragments.",
        ],
        "Lithic" => [
            "title" => "Lithics Home Page",
            "text" => "This module displays the chipped and flaked stone tools found by the Jezreel Expedition.",
        ],
        "Metal" => [
            "title" => "Metals Home Page",
            "text" => "This module displays the metal artifacts found at the site.",
        ],
        "Glass" => [
            "title" => "Glass Home Page",
            "text" => "This module displays the glass artifacts found at the site.",
        ],
        "Flora" => [
            "title" => "Flora Home Page",
            "text" => "This module displays the flora recovered from the site.",
        ],
        "Fauna" => [
            "title" => "Fauna Home Page",
            "text" => "This module displays the fauna recovered from the site.",
        ],
        "About" => [
            "title" => "About This Website",
            "text" => "This is the database of the Jezreel Expedition, a survey and excavation project in Israel sponsored by
            the University of Haifa and the University of Evansville and co-directed by Norma Franklin and Jennie Ebeling 2012-2018.",
        ],
    ];

    public static function welcome(String $module): array
    {
        return self::$welcome_pages[$module];
    }
}
