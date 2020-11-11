<?php

namespace App\JezStatic;

class AboutPages
{
    private static $tabs = ["The Dig", "The Website"];
    private static $types = ["Text", 0];

    private static $items = [
        [
            "tab" => 0,
            "type" => 1,
            "title" => "The Jezreel Expedition",
            "folder" => "jez-exp",
            "slides" => [
                [
                    "title" => "The Jezreel-Expedition",
                    "text" => "We are a multinational team intent on exploring the archaeology and history of greater Jezreel.
                    The Jezreel Expedition is sponsored by the Zinman Institute of Archaeology at the University of Haifa, Israel,
                    and the University of Evansville in Indiana. Norma Franklin (University of Haifa) and Jennie Ebeling (University of Evansville)
                    co-direct the project; Ian Cipin (University of Evansville) is Field Director.",
                ],
                [
                    "title" => "The Dig Area",
                    "text" => "Ancient Jezreel is located at the Southern side of the Jezreel Valley,
                on an outcrop of the Gilboa mountains.",
                ],
                ["title" => "slide 3", "text" => "slide 3 text"],
            ],
        ],
        [
            "tab" => 0,
            "type" => 1,
            "title" => "Location",
            "folder" => "location",
            "slides" => [
                [
                    "title" => "The Jezreel Valley",
                    "text" => "The Jezreel valley is the largest valley in Israel and known in biblical times as the
                    bread basket due to it fertile soil and a fresh supply of water from numerous springs located at
                    the foothills sorrounding it",
                ],
                [
                    "title" => "Jezreel",
                    "text" => "Ancient Jezreel is located at the Southern side of the Jezreel Valley,
                on an outcrop of the Gilboa mountains.",
                ],
                ["title" => "slide 3", "text" => "slide 3 text"],
                ["title" => "slide 4", "text" => "slide 4 text"],

            ],
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 0,
            "type" => 1,
            "title" => "Areas",
            "folder" => "areas",
            "slides" => [
                ["title" => "slide 1", "text" => "slide 1 text"],
                ["title" => "slide 2", "text" => "slide 2 text"],
                ["title" => "slide 3", "text" => "slide 3 text"],
                ["title" => "slide 4", "text" => "slide 4 text"],

            ],
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 0,
            "type" => 0,
            "title" => "Tell Ein-Jezreel",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 0,
            "type" => 0,
            "title" => "Areas",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 0,
            "type" => 0,
            "title" => "Seasons",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 0,
            "type" => 0,
            "title" => "History of Research",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 0,
            "type" => 0,
            "title" => "Goals",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 1,
            "type" => 0,
            "title" => "What is this website",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 1,
            "type" => 0,
            "title" => "Motivation",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 1,
            "type" => 0,
            "title" => "Design Goals",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 1,
            "type" => 0,
            "title" => "Some Technical Details",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
        [
            "tab" => 1,
            "type" => 0,
            "title" => "Future Plans",
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
    ];

    public static function index()
    {
        $mapped = array_map(function ($v, $k) {
            return (object) ["tab" => $v["tab"], "type" => $v["type"], "id" => $k, "title" => $v["title"]];
        }, self::$items, array_keys(self::$items));
        return $mapped;
    }

    public static function show($id): object
    {
        $item = (object) self::$items[$id];
        if ($item->type === 1) {
            $formatted_item = clone $item;
            $slides = [];
            foreach ($item->slides as $key => $slide) {
                $fullMediaName = 'slides/' . $item->folder . '/slide' . $key . '.jpg';
                $thumbMediaName = 'slides/' . $item->folder . '/slide' . $key . '-tn.jpg';

                array_push($slides, (object) [
                    'title' => $slide["title"],
                    'text' => $slide["text"],
                    'fullUrl' => \Storage::disk('app-media')->url($fullMediaName),
                    'tnUrl' => \Storage::disk('app-media')->url($thumbMediaName),
                ]);
            }
            $formatted_item->slides = $slides;
            return $formatted_item;
        }
        return $item; //(object) self::$items[$id];
    }

    public function app_media(Request $request)
    {
        $backgroundUrls = [];

        $myModels = array("App", "About", "Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass", "Flora", "Fauna", "Tbd");

        foreach ($myModels as $modelName) {
            $fullMediaName = 'backgrounds/' . $modelName . '.jpg';
            $thumbMediaName = 'backgrounds/' . $modelName . '-tn.jpg';
            //$backgroundUrls[$modelName] = \Storage::disk('app-media')->url($fullMediaName);

            $backgroundUrls[$modelName] = (object) [
                'fullUrl' => \Storage::disk('app-media')->url($fullMediaName),
                'tnUrl' => \Storage::disk('app-media')->url($thumbMediaName),
            ];
        }
        $carouselItems = [];
        $carouselTexts = ["Welcome! This website displays the results of an 8-year expedition to Tel-Ein-Jezreel.",
            "It is aimed at a fuller expopsure of the dig`s data than available in paper format.",
            "We strive to facilitate intuitive search and links to context data",
            "The database was design from its inception to be media rich.",
            "I am very tired and fat.",
            "",
            ""];

        foreach ($carouselTexts as $index => $text) {
            $fullMediaName = 'carousel/item' . $index . '.jpg';
            array_push($carouselItems, (object) ['text' => $text, 'url' => \Storage::disk('app-media')->url($fullMediaName)]);
        }

        return response()->json([
            "message" => "succesfully loaded app_media",
            "appMedia" => [
                "backgroundUrls" => $backgroundUrls,
                "carouselItems" => $carouselItems,
            ],
        ], 200);
    }
}
