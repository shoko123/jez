<?php

namespace App\JezStatic;

class AboutPages
{
    private static $tabs = ["The Dig", "The Website"];
    private static $types = ["Text", 0];

    private static $items = [
        [
            "tab" => 1,
            "no" => 1,
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
            "tab" => 1,
            "no" => 2,
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
            "tab" => 1,
            "no" => 3,
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
            "tab" => 2,
            "no" => 1,
            "type" => 0,
            "title" => "What is this website?",
            "text" => ["This website serves as a central depository for some of the material remains recovered from Tel Ein-Jezreel and its vicinity by the Jezreel-Expedition.",
                "It includes a brief introduction to the site and its history and the Expedition's mission and research questions.",
                "The bulk part of the website is devoted to a detailed, media rich, description of the small finds retrieved from the dig and their immediate contexts (loci)."],
        ],
        [
            "tab" => 2,
            "no" => 2,
            "type" => 0,
            "title" => "Motivation",
            "text" => ["The Jezreel Expedition yielded a large amount of small finds. During the field seasons registration was done using
                spreadsheets and in addition numerous photos were taken.",
                "The motivation for creating this website was in witnessing the limitatation of this recording system.
                This Database is an attempt to replace them with a more integrated system that allows for an easier
                retrieval and viewing of the records with their related media."],
        ],
        [
            "tab" => 2,
            "no" => 3,
            "type" => 0,
            "title" => "Goals for Website/Database",
            "text" => [
                "- to serve as a complete publication of the small finds with easy access to related media.",
                "- to have an intuitive navigation between the finds and their 'parent' loci.",
                "- to allow for complex querying while keeping the user interface simple and intuitive.",
                "- to serve as a centralized depository for all contributing specialists.",
                "- to use mainstream, free, and open software (avoid exotic or commercial components).",
                "- to have a modern look and feel.",
            ],
        ],
        [
            "tab" => 2,
            "no" => 4,
            "type" => 0,
            "title" => "Technical Details",
            "text" => [
                "Backend: MySql, Laravel, Spatie (backups, permissions, medialibrary, tags), tymon/jwt-auth, lazychaser/laravel-nestedset.",
                "Frontend: Vue, axios, Vuetify, Vuelidate, Vue-router, Vuex, normalizr, SortableJS/Vue.Draggable.",
                "Proudly hosted on a $5 Digital Ocean Ubuntu droplet."],
        ],
        [
            "tab" => 2,
            "no" => 5,
            "type" => 0,
            "title" => "Current Status",
            "text" => [
                "This website should be considered a work in progress as it relates to both the website itself and the data entered.
                Some software modules are still bluntly missing,
                as are the thousands of pictured that are yet to be uploaded,
                and the missing tags, identifications, comments, and analyses yet to be added by specialists.", ],
        ],
        [
            "tab" => 2,
            "no" => 6,
            "type" => 0,
            "title" => "Future and Prospects",
            "text" => ["We hope to improve this website and add more features as time allows.
                Some high priority items are:",
                "- implement a generic spatial unit Module (e.g. Wall, Space, Structure, Room, etc...)",
                "- organized these spatial units in a tree structure for easy 'navigation' around the dig.",
                "- add Flora, and Fauna and modules.",
                "- add responsive design.",
                "- add summaries and statistics.",
                "- finish authorization and administrative modules.",
                "- migrate to Vue3 and typescript."],
        ],
        [
            "tab" => 2,
            "no" => 7,
            "type" => 0,
            "title" => "A few middle-thoughts",
            "text" => [
                "1. While this database does not replace a final report, it can greatly enhance it by allowing
                    the inclusion of numerous media and querying tools which allow fellow researchers, and the public at large,
                a far more complete picture of the excavation than possible in printed form.",
                "2. As technology changes rapidly and requires constant maintenance and updates this
                website is facing an inevitable demise without institutional support.", ],
        ],
    ];

    public static function index()
    {
        $mapped = array_map(function ($v, $k) {
            return (object) ["tab" => $v["tab"], "type" => $v["type"], "id" => $k, "title" => strval($v["tab"]) . "." . strval($v["no"]) . " " . $v["title"]];
        }, self::$items, array_keys(self::$items));
        return $mapped;
    }

    public static function show($id): object
    {
        $item = (object) self::$items[$id];
        $formatted_item = clone $item;
        $formatted_item->id = $id;
        $formatted_item->title = strval($item->tab) . "." . strval($item->no) . " " . $item->title;
        if ($item->type === 1) {
            $slides = [];
            foreach ($item->slides as $key => $slide) {
                $fullMediaName = 'slides/' . $item->folder . '/slide' . $key . '.jpg';
                $thumbMediaName = 'slides/' . $item->folder . '/slide' . $key . '-tn.jpg';

                array_push($slides, (object) [
                    'title' => strval($key + 1) . ". " . $slide["title"],
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
