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
                    "title" => "Introduction",
                    "text" => "The  Jezreel-Expedition is a multinational team intent on exploring the archaeology and history of greater Jezreel.
                    In 2012 the team carried out a survey of the area surrounding tel Jezreel. Active excavations took place in the years 2013-2018.
                    Currently the team is preparing for the publication of the excavation results.",
                ],
                [
                    "title" => "Tel Ein-Jezreel",
                    "text" => "While earlier digs in the area focused on Tel-Jezreel believed to be the remains of biblical
                    Jezreel (seen on the left side of the image), the current excavation focused mostly on the uncultivted area next to 
                    the spring Ein-Jezreel that was formally named tel Ein-Jezreel. The results from that Tel show evidence of inhabitancy from the Neolithic to the Early Bronze periods.",
                ],
                ["title" => "The Winery", "text" => "Talk about Winery"],
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
                    "text" => "The Jezreel valley is the largest valley in Israel. It streches from the sea to the Jordan valley and was 
                    an important agricultural area and the path of important international roads.",
                ],
                [
                    "title" => "Tel-Jezreel",
                    "text" => "Large scale excavation in the years 1990-1996 in the area of the summit of the Gilboa outcrop into the valley 
                    and next to the remains of the Arab village of Zerin led to the identification of the remains with biblical Jezreel.",
                ],
                ["title" => "Ein Jezreel", "text" => "The nearest water source to Tel-Jezreel is Ein-Jezreel, at the bottom of the Hill,
                    an easy 30 minutes away"],
                ["title" => "slide 4", "text" => "slide 4 text"],

            ],
            "text" => "This module described the different areas surveyed/dug by the Jezreel Expedition.
                        Those areas are marked on the Lidar image displayed.",
        ],
       
      
        [
            "tab" => 0,
            "type" => 1,
            "title" => "History of Research",
            "folder" => "jez-exp",
            "slides" => [
                [
                    "title" => "The Jezreel Valley",
                    "text" => "The Jezreel valley is the largest valley in Israel. It streches from the sea to the Jordan valley and was 
                    an important agricultural area and the path of important international roads.",
                ],
                [
                    "title" => "Tel-Jezreel",
                    "text" => "Large scale excavation in the years 1990-1996 in the area of the summit of the Gilboa outcrop into the valley 
                    and next to the remains of the Arab village of Zerin led to the identification of the remains with biblical Jezreel.",
                ],
                ["title" => "Ein Jezreel", "text" => "The nearest water source to Tel-Jezreel is Ein-Jezreel, at the bottom of the Hill,
                    an easy 30 minutes away"],
                ["title" => "slide 4", "text" => "slide 4 text"],

            ],
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
        $formatted_item = clone $item;
        $formatted_item->id = $id;
        if ($item->type === 1) {          
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
        }
        return $formatted_item; //(object) self::$items[$id];
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
